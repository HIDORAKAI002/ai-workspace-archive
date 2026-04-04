# Studi Kasus: Mengekspos REST API di API Management sebagai server MCP

Azure API Management adalah layanan yang menyediakan Gateway di atas Endpoint API Anda. Cara kerjanya adalah Azure API Management bertindak seperti proxy di depan API Anda dan dapat memutuskan apa yang harus dilakukan dengan permintaan yang masuk.

Dengan menggunakannya, Anda menambahkan banyak fitur seperti:

- **Keamanan**, Anda bisa menggunakan segala sesuatu mulai dari kunci API, JWT hingga managed identity.
- **Pembatasan laju**, fitur hebat adalah kemampuan menentukan berapa banyak panggilan yang diterima per satuan waktu tertentu. Ini membantu memastikan semua pengguna memiliki pengalaman yang baik dan juga agar layanan Anda tidak kewalahan dengan permintaan.
- **Skalasi & Penyeimbangan beban**. Anda dapat mengatur sejumlah endpoint untuk menyeimbangkan beban dan Anda juga dapat memutuskan bagaimana cara "load balance".
- **Fitur AI seperti semantic caching**, batas token dan pemantauan token dan lainnya. Ini adalah fitur hebat yang meningkatkan responsivitas serta membantu Anda mengendalikan pengeluaran token Anda. [Baca lebih lanjut di sini](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Mengapa MCP + Azure API Management?

Model Context Protocol dengan cepat menjadi standar untuk aplikasi AI yang berperan sebagai agen dan cara mengekspos alat serta data secara konsisten. Azure API Management adalah pilihan alami ketika Anda perlu "mengelola" API. Server MCP sering kali terintegrasi dengan API lain untuk menyelesaikan permintaan ke suatu alat misalnya. Oleh karena itu menggabungkan Azure API Management dan MCP sangat masuk akal.

## Ikhtisar

Dalam kasus penggunaan khusus ini kita akan belajar cara mengekspos endpoint API sebagai server MCP. Dengan melakukan ini, kita dapat dengan mudah menjadikan endpoint ini bagian dari aplikasi agen sambil juga memanfaatkan fitur dari Azure API Management.

## Fitur Utama

- Anda memilih metode endpoint yang ingin Anda ekspos sebagai alat.
- Fitur tambahan yang Anda dapatkan bergantung pada apa yang Anda konfigurasikan di bagian kebijakan untuk API Anda. Namun di sini kita akan menunjukkan cara menambahkan pembatasan laju.

## Langkah Awal: impor API

Jika Anda sudah memiliki API di Azure API Management, bagus, maka Anda bisa melewati langkah ini. Jika belum, lihat tautan ini, [mengimpor API ke Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Mengekspos API sebagai Server MCP

Untuk mengekspos endpoint API, ikuti langkah-langkah berikut:

1. Arahkan ke Azure Portal dan alamat berikut <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Arahkan ke instance API Management Anda.

1. Di menu kiri, pilih APIs > MCP Servers > + Create new MCP Server.

1. Pada API, pilih REST API yang akan diekspos sebagai server MCP.

1. Pilih satu atau lebih Operasi API untuk diekspos sebagai alat. Anda bisa memilih semua operasi atau hanya operasi tertentu.

    ![Pilih metode untuk diekspos](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. Pilih **Create**.

1. Arahkan ke opsi menu **APIs** dan **MCP Servers**, Anda akan melihat berikut ini:

    ![Lihat server MCP di panel utama](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Server MCP telah dibuat dan operasi API diekspos sebagai alat. Server MCP tercantum di panel MCP Servers. Kolom URL menunjukkan endpoint server MCP yang dapat Anda panggil untuk pengujian atau dalam aplikasi klien.

## Opsional: Konfigurasikan kebijakan

Azure API Management memiliki konsep inti kebijakan di mana Anda dapat mengatur aturan berbeda untuk endpoint Anda seperti pembatasan laju atau semantic caching. Kebijakan ini dibuat dalam format XML.

Berikut cara mengatur kebijakan untuk membatasi laju pada Server MCP Anda:

1. Di portal, di bawah APIs, pilih **MCP Servers**.

1. Pilih server MCP yang Anda buat.

1. Di menu kiri, di bawah MCP, pilih **Policies**.

1. Di editor kebijakan, tambahkan atau sunting kebijakan yang ingin Anda terapkan ke alat server MCP. Kebijakan didefinisikan dalam format XML. Misalnya, Anda dapat menambahkan kebijakan untuk membatasi panggilan ke alat server MCP (dalam contoh ini, 5 panggilan per 30 detik per alamat IP klien). Berikut XML yang akan menyebabkan pembatasan laju:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```
  
    Berikut gambar editor kebijakan:

    ![Editor kebijakan](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Coba Sekarang

Mari pastikan Server MCP kita bekerja dengan baik.

Untuk ini, kita akan menggunakan Visual Studio Code dan GitHub Copilot dengan mode Agen-nya. Kita akan menambahkan server MCP ke *mcp.json*. Dengan cara ini, Visual Studio Code akan bertindak sebagai klien dengan kemampuan agen dan pengguna akhir dapat mengetikkan prompt dan berinteraksi dengan server tersebut.

Berikut cara menambahkan server MCP di Visual Studio Code:

1. Gunakan perintah MCP: **Add Server dari Command Palette**.

1. Saat diminta, pilih tipe server: **HTTP (HTTP atau Server Sent Events)**.

1. Masukkan URL server MCP di API Management. Contoh: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (untuk endpoint SSE) atau **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (untuk endpoint MCP), perhatikan perbedaan transportasinya adalah `/sse` atau `/mcp`.

1. Masukkan ID server sesuai pilihan Anda. Ini bukan nilai penting tetapi akan membantu Anda mengingat server instance ini.

1. Pilih apakah konfigurasi akan disimpan ke pengaturan workspace atau pengaturan pengguna.

  - **Workspace settings** - Konfigurasi server disimpan ke file .vscode/mcp.json yang hanya tersedia di workspace saat ini.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```
  
    atau jika Anda memilih streaming HTTP sebagai transportasinya, akan sedikit berbeda:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```
  
  - **User settings** - Konfigurasi server ditambahkan ke file *settings.json* global Anda dan tersedia di semua workspace. Konfigurasinya terlihat seperti berikut:

    ![Pengaturan pengguna](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Anda juga perlu menambahkan konfigurasi, sebuah header agar autentikasi berjalan dengan benar ke Azure API Management. Ia menggunakan header bernama **Ocp-Apim-Subscription-Key**.

    - Berikut cara menambahkannya ke settings:

    ![Menambah header untuk autentikasi](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), ini akan memunculkan prompt untuk memasukkan nilai kunci API yang dapat Anda temukan di Azure Portal untuk instance Azure API Management Anda.

   - Untuk menambahkannya ke *mcp.json* sebagai gantinya, Anda dapat menambahkannya seperti ini:

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
  
### Gunakan Mode Agen

Sekarang kita sudah siap di settings atau di *.vscode/mcp.json*. Mari coba sekarang.

Harus ada ikon Tools seperti ini, di mana alat yang diekspos dari server Anda terdaftar:

![Alat dari server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Klik ikon alat dan Anda akan melihat daftar alat seperti ini:

    ![Alat](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Ketik prompt di chat untuk memanggil alat. Misalnya, jika Anda memilih alat untuk mendapatkan informasi tentang sebuah pesanan, Anda bisa menanyakan agen tentang pesanan tersebut. Berikut contoh prompt:

    ```text
    get information from order 2
    ```
  
    Anda sekarang akan melihat ikon alat yang meminta Anda untuk melanjutkan memanggil alat. Pilih untuk melanjutkan menjalankan alat, Anda akan melihat output seperti ini:

    ![Hasil dari prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **apa yang Anda lihat di atas tergantung alat yang sudah Anda siapkan, tetapi idenya adalah Anda mendapatkan respon teks seperti itu**


## Referensi

Berikut cara Anda dapat belajar lebih lanjut:

- [Tutorial tentang Azure API Management dan MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Contoh Python: Amankan server MCP jarak jauh menggunakan Azure API Management (eksperimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Lab otorisasi klien MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Gunakan ekstensi Azure API Management untuk VS Code untuk mengimpor dan mengelola API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Daftarkan dan temukan server MCP jarak jauh di Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Repo hebat yang menampilkan banyak kemampuan AI dengan Azure API Management
- [Workshop AI Gateway](https://azure-samples.github.io/AI-Gateway/) Berisi workshop menggunakan Azure Portal, yang merupakan cara bagus untuk mulai mengevaluasi kemampuan AI.

## Selanjutnya

- Kembali ke: [Ikhtisar Studi Kasus](./README.md)
- Berikutnya: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berusaha memberikan terjemahan yang akurat, harap dipahami bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan jasa penerjemah profesional manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah tafsir yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->