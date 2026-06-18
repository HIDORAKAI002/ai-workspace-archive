# Pelayan MCP Cuaca

Ini adalah contoh Pelayan MCP dalam Python yang melaksanakan alat cuaca dengan maklum balas tiruan. Ia boleh digunakan sebagai kerangka untuk Pelayan MCP anda sendiri. Ia termasuk ciri-ciri berikut: 

- **Alat Cuaca**: Alat yang menyediakan maklumat cuaca tiruan berdasarkan lokasi yang diberikan.
- **Sambung ke Pembina Agen**: Ciri yang membolehkan anda menyambungkan pelayan MCP ke Pembina Agen untuk ujian dan pengesanan ralat.
- **Debug dalam [Pemeriksa MCP](https://github.com/modelcontextprotocol/inspector)**: Ciri yang membolehkan anda mengesan ralat Pelayan MCP menggunakan Pemeriksa MCP.

## Mulakan dengan templat Pelayan MCP Cuaca

> **Prasyarat**
>
> Untuk menjalankan Pelayan MCP di mesin pembangunan tempatan anda, anda memerlukan:
>
> - [Python](https://www.python.org/)
> - (*Pilihan - jika anda lebih suka uv*) [uv](https://github.com/astral-sh/uv)
> - [Sambungan Penyahpepijat Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Sediakan persekitaran

Terdapat dua pendekatan untuk menyediakan persekitaran bagi projek ini. Anda boleh memilih salah satu mengikut kesukaan anda.

> Nota: Muat semula VSCode atau terminal untuk memastikan python persekitaran maya digunakan selepas mewujudkan persekitaran maya.

| Pendekatan | Langkah-langkah |
| -------- | ----- |
| Menggunakan `uv` | 1. Cipta persekitaran maya: `uv venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari persekitaran maya yang dicipta <br>3. Pasang kebergantungan (termasuk kebergantungan pembangunan): `uv pip install -r pyproject.toml --extra dev` |
| Menggunakan `pip` | 1. Cipta persekitaran maya: `python -m venv .venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari persekitaran maya yang dicipta<br>3. Pasang kebergantungan (termasuk kebergantungan pembangunan): `pip install -e .[dev]` | 

Setelah menyediakan persekitaran, anda boleh menjalankan pelayan di mesin pembangunan tempatan anda melalui Pembina Agen sebagai Klien MCP untuk bermula:
1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` atau tekan `F5` untuk mula mengesan ralat pelayan MCP.
2. Gunakan Microsoft Foundry Toolkit Agent Builder untuk menguji pelayan dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Pelayan akan disambungkan secara automatik ke Pembina Agen.
3. Klik `Run` untuk menguji pelayan dengan prompt.

**Tahniah**! Anda telah berjaya menjalankan Pelayan MCP Cuaca di mesin pembangunan tempatan anda melalui Pembina Agen sebagai Klien MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Apa yang termasuk dalam templat

| Folder / Fail| Kandungan                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Fail VSCode untuk penyahpepijatan                   |
| `.aitk`      | Konfigurasi untuk Microsoft Foundry Toolkit                |
| `src`        | Kod sumber untuk pelayan mcp cuaca   |

## Cara mengesan ralat Pelayan MCP Cuaca

> Nota:
> - [Pemeriksa MCP](https://github.com/modelcontextprotocol/inspector) ialah alat pembangun visual untuk menguji dan mengesan ralat pelayan MCP.
> - Semua mod penyahpepijatan menyokong titik henti, jadi anda boleh menambah titik henti pada kod pelaksanaan alat.

| Mod Penyahpepijatan | Penerangan | Langkah untuk mengesan ralat |
| ---------- | ----------- | --------------- |
| Pembina Agen | Mengesan ralat pelayan MCP dalam Pembina Agen melalui Microsoft Foundry Toolkit. | 1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` dan tekan `F5` untuk mula mengesan ralat pelayan MCP.<br>2. Gunakan Microsoft Foundry Toolkit Agent Builder untuk menguji pelayan dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Pelayan akan disambungkan secara automatik ke Pembina Agen.<br>3. Klik `Run` untuk menguji pelayan dengan prompt. |
| Pemeriksa MCP | Mengesan ralat pelayan MCP menggunakan Pemeriksa MCP. | 1. Pasang [Node.js](https://nodejs.org/)<br> 2. Sediakan Pemeriksa: `cd inspector` && `npm install` <br> 3. Buka panel Debug VS Code. Pilih `Debug SSE in Inspector (Edge)` atau `Debug SSE in Inspector (Chrome)`. Tekan F5 untuk mula mengesan ralat.<br> 4. Apabila Pemeriksa MCP dilancarkan dalam pelayar, klik butang `Connect` untuk menyambungkan pelayan MCP ini.<br> 5. Kemudian anda boleh `List Tools`, pilih alat, input parameter, dan `Run Tool` untuk mengesan ralat kod pelayan anda.<br> |

## Pelabuhan Lalai dan pengubahsuaian

| Mod Penyahpepijatan | Pelabuhan | Definisi | Pengubahsuaian | Nota |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Pembina Agen | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) untuk menukar pelabuhan di atas. | N/A |
| Pemeriksa MCP | 3001 (Pelayan); 5173 dan 3000 (Pemeriksa) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) untuk menukar pelabuhan di atas.| N/A |

## Maklum balas

Jika anda mempunyai maklum balas atau cadangan untuk templat ini, sila buka isu di [Repositori GitHub Microsoft Foundry Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->