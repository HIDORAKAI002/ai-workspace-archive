# Pembangunan Perkhidmatan Ejen Azure AI

Dalam latihan ini, anda menggunakan alat perkhidmatan Ejen Azure AI di [portal Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) untuk membuat ejen bagi Tempahan Penerbangan. Ejen ini akan dapat berinteraksi dengan pengguna dan memberikan maklumat tentang penerbangan.

## Prasyarat

Untuk melengkapkan latihan ini, anda memerlukan yang berikut:
1. Akaun Azure dengan langganan aktif. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Anda memerlukan kebenaran untuk membuat hub Microsoft Foundry atau mempunyai satu yang dibuat untuk anda.
    - Jika peranan anda adalah Contributor atau Owner, anda boleh mengikuti langkah dalam tutorial ini.

## Buat hub Microsoft Foundry

> **Nota:** Microsoft Foundry dahulunya dikenali sebagai Azure AI Studio.

1. Ikuti garis panduan daripada catatan blog [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ini untuk membuat hub Microsoft Foundry.
2. Apabila projek anda telah dibuat, tutup sebarang petua yang dipaparkan dan semak halaman projek di portal Microsoft Foundry, yang sepatutnya kelihatan serupa dengan imej berikut:

    ![Projek Microsoft Foundry](../../../translated_images/ms/azure-ai-foundry.88d0c35298348c2f.webp)

## Menyebarkan model

1. Dalam panel di kiri untuk projek anda, di seksyen **My assets**, pilih halaman **Models + endpoints**.
2. Dalam halaman **Models + endpoints**, di tab **Model deployments**, dalam menu **+ Deploy model**, pilih **Deploy base model**.
3. Cari model `gpt-4o-mini` dalam senarai, kemudian pilih dan sahkan ia.

    > **Nota**: Mengurangkan TPM membantu mengelakkan penggunaan kuota yang berlebihan dalam langganan yang anda gunakan.

    ![Model Ditempatkan](../../../translated_images/ms/model-deployment.3749c53fb81e18fd.webp)

## Cipta ejen

Sekarang anda telah menyebarkan model, anda boleh mencipta ejen. Ejen adalah model AI perbualan yang boleh digunakan untuk berinteraksi dengan pengguna.

1. Dalam panel di kiri untuk projek anda, di bahagian **Build & Customize**, pilih halaman **Agents**.
2. Klik **+ Create agent** untuk mencipta ejen baru. Di bawah kotak dialog **Agent Setup**:
    - Masukkan nama untuk ejen, seperti `FlightAgent`.
    - Pastikan bahawa penyebaran model `gpt-4o-mini` yang anda buat sebelum ini dipilih
    - Tetapkan **Instructions** mengikut prompt yang anda mahu ejen ikuti. Berikut adalah contoh:
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
> Untuk prompt yang lebih terperinci, anda boleh semak [repositori ini](https://github.com/ShivamGoyal03/RoamMind) untuk maklumat lanjut.
    
> Selain itu, anda boleh menambah **Knowledge Base** dan **Actions** untuk meningkatkan keupayaan ejen bagi menyediakan lebih banyak maklumat dan melaksanakan tugas automatik berdasarkan permintaan pengguna. Untuk latihan ini, anda boleh langkau langkah-langkah ini.
    
![Persediaan Ejen](../../../translated_images/ms/agent-setup.9bbb8755bf5df672.webp)

3. Untuk membuat ejen multi-AI baru, cuma klik **New Agent**. Ejen yang baru dibuat kemudian akan dipaparkan pada halaman Agents.

## Uji ejen

Selepas mencipta ejen, anda boleh mengujinya untuk melihat bagaimana ia memberi respons kepada pertanyaan pengguna di playground portal Microsoft Foundry.

1. Di bahagian atas panel **Setup** untuk ejen anda, pilih **Try in playground**.
2. Dalam panel **Playground**, anda boleh berinteraksi dengan ejen dengan menaip pertanyaan di tetingkap sembang. Sebagai contoh, anda boleh meminta ejen mencari penerbangan dari Seattle ke New York pada 28.

    > **Nota**: Ejen mungkin tidak memberikan respons yang tepat, kerana tiada data masa nyata digunakan dalam latihan ini. Tujuannya adalah untuk menguji kebolehan ejen memahami dan memberi respons kepada pertanyaan pengguna berdasarkan arahan yang diberikan.

    ![Playground Ejen](../../../translated_images/ms/agent-playground.dc146586de715010.webp)

3. Selepas menguji ejen, anda boleh menyesuaikannya lagi dengan menambah lebih banyak niat, data latihan, dan tindakan untuk meningkatkan keupayaannya.

## Bersihkan sumber

Apabila anda telah selesai menguji ejen, anda boleh memadamkannya untuk mengelakkan kos tambahan.
1. Buka [Azure portal](https://portal.azure.com) dan lihat kandungan kumpulan sumber di mana anda menyebarkan sumber hub yang digunakan dalam latihan ini.
2. Pada bar alat, pilih **Delete resource group**.
3. Masukkan nama kumpulan sumber dan sahkan bahawa anda mahu memadamkannya.

## Sumber

- [Dokumentasi Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Portal Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Panduan Mula dengan Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Asas ejen AI di Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Penafian:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi ralat atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sah. Untuk maklumat penting, terjemahan profesional oleh penterjemah manusia adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->