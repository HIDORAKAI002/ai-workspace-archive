# Pembangunan Perkhidmatan Ejen Microsoft Foundry

Dalam latihan ini, anda menggunakan alatan Perkhidmatan Ejen Microsoft Foundry di [portal Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) untuk mencipta ejen untuk Tempahan Penerbangan. Ejen ini akan dapat berinteraksi dengan pengguna dan menyediakan maklumat mengenai penerbangan.

## Prasyarat

Untuk melengkapkan latihan ini, anda memerlukan yang berikut:
1. Akaun Azure dengan langganan aktif. [Cipta akaun secara percuma](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Anda memerlukan kebenaran untuk mencipta hab Microsoft Foundry atau mempunyai satu hab dicipta untuk anda.
    - Jika peranan anda adalah Penyumbang atau Pemilik, anda boleh mengikuti langkah-langkah dalam tutorial ini.

## Cipta hab Microsoft Foundry

> **Nota:** Microsoft Foundry sebelum ini dikenali sebagai Azure AI Studio.

1. Ikuti garis panduan ini dari pos blog [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) untuk mencipta hab Microsoft Foundry.
2. Setelah projek anda dicipta, tutup sebarang petua yang dipaparkan dan semak halaman projek dalam portal Microsoft Foundry, yang sepatutnya kelihatan seperti imej berikut:

    ![Microsoft Foundry Project](../../../translated_images/ms/azure-ai-foundry.88d0c35298348c2f.webp)

## Sampaikan model

1. Dalam panel di sebelah kiri untuk projek anda, di bahagian **Aset saya**, pilih halaman **Model + titik akhir**.
2. Dalam halaman **Model + titik akhir**, di tab **Penempatan model**, pada menu **+ Sampaikan model**, pilih **Sampaikan model asas**.
3. Cari model `gpt-4.1-mini` dalam senarai, kemudian pilih dan sahkan.

    > **Nota**: Mengurangkan TPM membantu mengelakkan penggunaan kuota berlebihan dalam langganan yang anda gunakan.

    ![Model Deployed](../../../translated_images/ms/model-deployment.3749c53fb81e18fd.webp)

## Cipta ejen

Sekarang bahawa anda telah menyampaikan model, anda boleh mencipta ejen. Ejen ialah model AI perbualan yang boleh digunakan untuk berinteraksi dengan pengguna.

1. Dalam panel di sebelah kiri untuk projek anda, di bahagian **Bina & Sesuaikan**, pilih halaman **Ejen**.
2. Klik **+ Cipta ejen** untuk mencipta ejen baru. Dalam kotak dialog **Penetapan Ejen**:
    - Masukkan nama untuk ejen, seperti `FlightAgent`.
    - Pastikan penempatan model `gpt-4.1-mini` yang anda buat sebelum ini dipilih
    - Tetapkan **Arahan** mengikut arahan yang anda mahu ejen ikuti. Berikut adalah contoh:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> Untuk arahan terperinci, anda boleh semak [repositori ini](https://github.com/ShivamGoyal03/RoamMind) untuk maklumat lanjut.
    
> Selain itu, anda boleh menambah **Pangkalan Pengetahuan** dan **Tindakan** untuk meningkatkan keupayaan ejen menyediakan maklumat lebih banyak dan menjalankan tugas automatik berdasarkan permintaan pengguna. Untuk latihan ini, anda boleh abaikan langkah-langkah ini.
    
![Agent Setup](../../../translated_images/ms/agent-setup.9bbb8755bf5df672.webp)

3. Untuk mencipta ejen multi-AI baru, cuma klik **Ejen Baru**. Ejen yang baru dicipta kemudiannya akan dipaparkan pada halaman Ejen.


## Uji ejen

Selepas mencipta ejen, anda boleh mengujinya untuk melihat bagaimana ia bertindak balas kepada pertanyaan pengguna dalam taman permainan portal Microsoft Foundry.

1. Di bahagian atas panel **Penetapan** untuk ejen anda, pilih **Cuba dalam taman permainan**.
2. Dalam panel **Taman permainan**, anda boleh berinteraksi dengan ejen dengan menaip pertanyaan dalam tetingkap sembang. Contohnya, anda boleh meminta ejen mencari penerbangan dari Seattle ke New York pada 28 haribulan.

    > **Nota**: Ejen mungkin tidak memberikan jawapan tepat, kerana tiada data masa nyata digunakan dalam latihan ini. Tujuannya adalah untuk menguji keupayaan ejen memahami dan memberi jawapan kepada pertanyaan pengguna berdasarkan arahan yang diberikan.

    ![Agent Playground](../../../translated_images/ms/agent-playground.dc146586de715010.webp)

3. Selepas menguji ejen, anda boleh terus menyesuaikannya dengan menambah niat lebih banyak, data latihan, dan tindakan untuk meningkatkan keupayaannya.

## Bersihkan sumber

Apabila anda selesai menguji ejen, anda boleh memadamkannya untuk mengelakkan kos tambahan.
1. Buka [portal Azure](https://portal.azure.com) dan lihat kandungan kumpulan sumber di mana anda menyampaikan sumber hab yang digunakan dalam latihan ini.
2. Di bar alat, pilih **Padam kumpulan sumber**.
3. Masukkan nama kumpulan sumber dan sahkan bahawa anda ingin memadamnya.

## Sumber

- [Dokumentasi Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Portal Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Memulakan dengan Microsoft Foundry](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Asas ejen AI di Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->