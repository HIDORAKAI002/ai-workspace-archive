# Kajian Kes: Dedahkan REST API dalam Pengurusan API sebagai pelayan MCP

Azure API Management, adalah perkhidmatan yang menyediakan Gateway di atas Titik Akhir API anda. Cara ia berfungsi ialah Azure API Management bertindak seperti proksi di hadapan API anda dan boleh memutuskan apa yang perlu dilakukan dengan permintaan masuk.

Dengan menggunakannya, anda menambah pelbagai ciri seperti:

- **Keselamatan**, anda boleh menggunakan segala-galanya dari kunci API, JWT kepada pengenalan terurus.
- **Had kadar**, ciri hebat adalah keupayaan untuk memutuskan berapa banyak panggilan yang dibenarkan dalam satu unit masa tertentu. Ini membantu memastikan semua pengguna mempunyai pengalaman yang baik dan juga memastikan perkhidmatan anda tidak terlalu terbeban dengan permintaan.
- **Pengimbangan beban & skala**. Anda boleh menyediakan beberapa titik akhir untuk mengimbangkan beban dan anda juga boleh memutuskan bagaimana untuk "mengimbangkan beban".
- **Ciri AI seperti caching semantik**, had token dan pemantauan token dan banyak lagi. Ini adalah ciri hebat yang meningkatkan responsiviti serta membantu anda mengawal perbelanjaan token anda. [Baca selanjutnya di sini](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Kenapa MCP + Azure API Management?

Model Context Protocol cepat menjadi piawaian untuk aplikasi AI agen dan cara untuk mendedahkan alat dan data dengan cara yang konsisten. Azure API Management adalah pilihan semula jadi apabila anda perlu "mengurus" API. Pelayan MCP sering berintegrasi dengan API lain untuk menyelesaikan permintaan kepada alat sebagai contoh. Oleh itu, menggabungkan Azure API Management dan MCP adalah sangat masuk akal.

## Gambaran Keseluruhan

Dalam kes penggunaan khusus ini, kita akan belajar untuk mendedahkan titik akhir API sebagai Pelayan MCP. Dengan melakukan ini, kita boleh dengan mudah menjadikan titik akhir ini sebahagian daripada aplikasi agen sambil memanfaatkan ciri dari Azure API Management.

## Ciri Utama

- Anda memilih kaedah titik akhir yang anda mahu dedahkan sebagai alat.
- Ciri tambahan yang anda dapat bergantung pada apa yang anda konfigurasikan dalam bahagian dasar untuk API anda. Tetapi di sini kami akan tunjukkan bagaimana anda boleh menambah had kadar.

## Langkah Pra: import API

Jika anda sudah mempunyai API dalam Azure API Management, bagus, maka anda boleh langkau langkah ini. Jika tidak, semak pautan ini, [mengimport API ke Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Dedahkan API sebagai Pelayan MCP

Untuk mendedahkan titik akhir API, ikuti langkah ini:

1. Navigasi ke Azure Portal dan alamat berikut <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Navigasi ke instans Pengurusan API anda.

1. Dalam menu kiri, pilih APIs > MCP Servers > + Create new MCP Server.

1. Dalam API, pilih REST API untuk didedahkan sebagai pelayan MCP.

1. Pilih satu atau lebih Operasi API untuk didedahkan sebagai alat. Anda boleh memilih semua operasi atau hanya operasi tertentu.

    ![Pilih kaedah untuk dedahkan](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Pilih **Create**.

1. Navigasi ke pilihan menu **APIs** dan **MCP Servers**, anda harus melihat yang berikut:

    ![Lihat Pelayan MCP dalam panel utama](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Pelayan MCP telah dicipta dan operasi API didedahkan sebagai alat. Pelayan MCP disenaraikan dalam panel MCP Servers. Lajur URL menunjukkan titik akhir pelayan MCP yang anda boleh panggil untuk ujian atau dalam aplikasi klien.

## Pilihan: Konfigurasikan dasar

Azure API Management mempunyai konsep teras dasar di mana anda menetapkan peraturan berbeza untuk titik akhir anda seperti contohnya had kadar atau caching semantik. Dasar ini ditulis dalam XML.

Berikut ialah cara anda boleh menyediakan dasar untuk had kadar Pelayan MCP anda:

1. Dalam portal, di bawah APIs, pilih **MCP Servers**.

1. Pilih pelayan MCP yang anda cipta.

1. Dalam menu kiri, di bawah MCP, pilih **Policies**.

1. Dalam penyunting dasar, tambah atau edit dasar yang anda ingin gunakan pada alat pelayan MCP. Dasar ditakrifkan dalam format XML. Sebagai contoh, anda boleh menambah dasar untuk menghadkan panggilan ke alat pelayan MCP (dalam contoh ini, 5 panggilan per 30 saat per alamat IP klien). Berikut XML yang akan menghadkan kadar:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Berikut adalah imej penyunting dasar:

    ![Penyunting dasar](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Cuba ia

Mari pastikan Pelayan MCP kita berfungsi seperti yang diinginkan.

Untuk ini, kita akan menggunakan Visual Studio Code dan GitHub Copilot serta mod Agent-nya. Kita akan tambah pelayan MCP ke dalam *mcp.json*. Dengan berbuat demikian, Visual Studio Code akan bertindak sebagai klien dengan kebolehan agen dan pengguna akhir boleh menaip arahan dan berinteraksi dengan pelayan tersebut.

Mari lihat bagaimana, untuk menambah pelayan MCP dalam Visual Studio Code:

1. Gunakan perintah MCP: **Add Server dari Command Palette**.

1. Apabila diminta, pilih jenis pelayan: **HTTP (HTTP atau Server Sent Events)**.

1. Masukkan URL pelayan MCP dalam Pengurusan API. Contoh: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (untuk titik akhir SSE) atau **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (untuk titik akhir MCP), perhatikan perbezaan antara pengangkutan adalah `/sse` atau `/mcp`.

1. Masukkan ID pelayan pilihan anda. Ini bukan nilai penting tetapi akan membantu anda mengingati instans pelayan ini.

1. Pilih sama ada untuk simpan konfigurasi ke tetapan ruang kerja anda atau tetapan pengguna.

  - **Tetapan ruang kerja** - Konfigurasi pelayan disimpan ke fail .vscode/mcp.json yang hanya tersedia dalam ruang kerja semasa.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    atau jika anda memilih HTTP streaming sebagai pengangkutan ia akan sedikit berbeza:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Tetapan pengguna** - Konfigurasi pelayan ditambah ke fail *settings.json* global anda dan tersedia dalam semua ruang kerja. Konfigurasi adalah seperti berikut:

    ![Tetapan pengguna](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Anda juga perlu tambah konfigurasi, satu header untuk memastikan ia mengesahkan dengan betul ke arah Azure API Management. Ia menggunakan header yang dipanggil **Ocp-Apim-Subscription-Key**. 

    - Berikut cara anda boleh tambahkannya ke tetapan:

    ![Menambah header untuk pengesahan](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), ini akan menyebabkan prompt dipaparkan untuk meminta nilai kunci API yang boleh anda dapati dalam Azure Portal untuk instans Azure API Management anda.

   - Untuk menambahnya ke *mcp.json* sebaliknya, anda boleh tambah seperti berikut:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Gunakan mod Agent

Sekarang kita sudah semua sedia sama ada dalam tetapan atau dalam *.vscode/mcp.json*. Mari cuba.

Seharusnya terdapat ikon Alat seperti ini, di mana alat yang didedahkan daripada pelayan anda tersenarai:

![Alat daripada pelayan](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klik ikon alat dan anda harus melihat senarai alat seperti ini:

    ![Alat](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Masukkan arahan dalam sembang untuk menggunakan alat tersebut. Sebagai contoh, jika anda memilih alat untuk mendapatkan maklumat tentang pesanan, anda boleh bertanya kepada agen tentang pesanan. Berikut adalah contoh arahan:

    ```text
    get information from order 2
    ```

    Anda akan dipaparkan dengan ikon alat yang meminta anda meneruskan panggilan ke alat. Pilih untuk terus menjalankan alat, anda seharusnya melihat output seperti ini:

    ![Keputusan dari arahan](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **apa yang anda lihat di atas bergantung pada alat yang anda sediakan, tetapi idenya ialah anda mendapat respons teks seperti di atas**

## Rujukan

Berikut cara anda boleh belajar lebih lanjut:

- [Tutorial mengenai Azure API Management dan MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Contoh Python: Secure remote MCP servers using Azure API Management (eksperimen)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Makmal kebenaran klien MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Gunakan ekstensi Azure API Management untuk VS Code untuk mengimport dan mengurus API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Daftar dan temui pelayan MCP jauh di Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Repositori hebat yang menunjukkan banyak kebolehan AI dengan Azure API Management
- [Bengkel AI Gateway](https://azure-samples.github.io/AI-Gateway/) Mengandungi bengkel menggunakan Azure Portal, yang merupakan cara hebat untuk mula menilai kebolehan AI.

## Apa Seterusnya

- Kembali ke: [Gambaran Keseluruhan Kajian Kes](./README.md)
- Seterusnya: [Ejen Perjalanan Azure AI](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidakakuratan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->