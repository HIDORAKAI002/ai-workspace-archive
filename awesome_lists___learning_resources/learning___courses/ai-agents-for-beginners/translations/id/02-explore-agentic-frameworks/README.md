[![Menjelajahi Kerangka Kerja Agen AI](../../../translated_images/id/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Klik gambar di atas untuk menonton video pelajaran ini)_

# Jelajahi Kerangka Kerja Agen AI

Kerangka kerja agen AI adalah platform perangkat lunak yang dirancang untuk menyederhanakan pembuatan, penyebaran, dan pengelolaan agen AI. Kerangka kerja ini menyediakan komponen yang telah dibangun sebelumnya, abstraksi, dan alat yang memudahkan pengembangan sistem AI yang kompleks bagi pengembang.

Kerangka kerja ini membantu pengembang untuk fokus pada aspek unik aplikasi mereka dengan memberikan pendekatan standar terhadap tantangan umum dalam pengembangan agen AI. Mereka meningkatkan skalabilitas, aksesibilitas, dan efisiensi dalam membangun sistem AI.

## Pengantar

Pelajaran ini akan membahas:

- Apa itu Kerangka Kerja Agen AI dan apa yang dapat dicapai pengembang dengannya?
- Bagaimana tim dapat menggunakan ini untuk dengan cepat membuat prototipe, iterasi, dan meningkatkan kemampuan agen mereka?
- Apa perbedaan antara kerangka kerja dan alat yang dibuat oleh Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> dan <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Bisakah saya mengintegrasikan alat ekosistem Azure saya yang sudah ada secara langsung, atau apakah saya memerlukan solusi mandiri?
- Apa itu Microsoft Foundry Agent Service dan bagaimana ini membantu saya?

## Tujuan Pembelajaran

Tujuan pelajaran ini adalah membantu Anda memahami:

- Peran Kerangka Kerja Agen AI dalam pengembangan AI.
- Cara memanfaatkan Kerangka Kerja Agen AI untuk membangun agen cerdas.
- Kemampuan utama yang diaktifkan oleh Kerangka Kerja Agen AI.
- Perbedaan antara Microsoft Agent Framework dan Microsoft Foundry Agent Service.

## Apa itu Kerangka Kerja Agen AI dan apa yang memungkinkan pengembang lakukan?

Kerangka Kerja AI tradisional dapat membantu Anda mengintegrasikan AI ke dalam aplikasi Anda dan membuat aplikasi tersebut lebih baik dengan cara berikut:

- **Personalisasi**: AI dapat menganalisis perilaku dan preferensi pengguna untuk menyediakan rekomendasi, konten, dan pengalaman yang dipersonalisasi.
Contoh: Layanan streaming seperti Netflix menggunakan AI untuk menyarankan film dan acara berdasarkan riwayat tontonan, meningkatkan keterlibatan dan kepuasan pengguna.
- **Otomatisasi dan Efisiensi**: AI dapat mengotomatiskan tugas berulang, menyederhanakan alur kerja, dan meningkatkan efisiensi operasional.
Contoh: Aplikasi layanan pelanggan menggunakan chatbot bertenaga AI untuk menangani pertanyaan umum, mengurangi waktu respons dan membebaskan agen manusia untuk masalah yang lebih kompleks.
- **Pengalaman Pengguna yang Ditingkatkan**: AI dapat memperbaiki pengalaman pengguna secara keseluruhan dengan menyediakan fitur cerdas seperti pengenalan suara, pemrosesan bahasa alami, dan teks prediktif.
Contoh: Asisten virtual seperti Siri dan Google Assistant menggunakan AI untuk memahami dan merespons perintah suara, memudahkan pengguna berinteraksi dengan perangkat mereka.

### Semua itu terdengar hebat, lalu mengapa kita membutuhkan Kerangka Kerja Agen AI?

Kerangka kerja agen AI mewakili sesuatu yang lebih dari sekadar kerangka kerja AI. Mereka dirancang untuk memungkinkan pembuatan agen cerdas yang dapat berinteraksi dengan pengguna, agen lain, dan lingkungan untuk mencapai tujuan tertentu. Agen ini dapat menunjukkan perilaku otonom, membuat keputusan, dan beradaptasi dengan kondisi yang berubah. Mari kita lihat beberapa kemampuan utama yang diaktifkan oleh Kerangka Kerja Agen AI:

- **Kolaborasi dan Koordinasi Agen**: Memungkinkan pembuatan beberapa agen AI yang dapat bekerja sama, berkomunikasi, dan berkoordinasi untuk menyelesaikan tugas kompleks.
- **Otomatisasi dan Manajemen Tugas**: Menyediakan mekanisme untuk mengotomatiskan alur kerja multi-langkah, delegasi tugas, dan manajemen tugas dinamis antar agen.
- **Pemahaman Konteks dan Adaptasi**: Membekali agen dengan kemampuan untuk memahami konteks, beradaptasi dengan lingkungan yang berubah, dan membuat keputusan berdasarkan informasi waktu nyata.

Jadi, secara ringkas, agen memungkinkan Anda melakukan lebih banyak, membawa otomatisasi ke tingkat berikutnya, menciptakan sistem yang lebih cerdas yang dapat beradaptasi dan belajar dari lingkungan mereka.

## Bagaimana cara dengan cepat membuat prototipe, iterasi, dan meningkatkan kemampuan agen?

Ini adalah lanskap yang bergerak cepat, tetapi ada beberapa hal yang umum pada sebagian besar Kerangka Kerja Agen AI yang dapat membantu Anda dengan cepat membuat prototipe dan iterasi, yaitu komponen modul, alat kolaboratif, dan pembelajaran waktu nyata. Mari kita bahas ini:

- **Gunakan Komponen Modular**: SDK AI menawarkan komponen yang telah dibangun sebelumnya seperti konektor AI dan Memori, pemanggilan fungsi menggunakan bahasa alami atau plugin kode, templat prompt, dan lainnya.
- **Manfaatkan Alat Kolaboratif**: Rancang agen dengan peran dan tugas tertentu, memungkinkan mereka untuk menguji dan menyempurnakan alur kerja kolaboratif.
- **Belajar secara Waktu Nyata**: Terapkan loop umpan balik di mana agen belajar dari interaksi dan menyesuaikan perilaku mereka secara dinamis.

### Gunakan Komponen Modular

SDK seperti Microsoft Agent Framework menawarkan komponen yang telah dibuat seperti konektor AI, definisi alat, dan manajemen agen.

**Bagaimana tim dapat menggunakan ini**: Tim dapat dengan cepat merakit komponen ini untuk membuat prototipe fungsional tanpa memulai dari awal, memungkinkan eksperimen dan iterasi yang cepat.

**Cara kerjanya dalam praktik**: Anda dapat menggunakan parser bawaan untuk mengekstrak informasi dari masukan pengguna, modul memori untuk menyimpan dan mengambil data, dan generator prompt untuk berinteraksi dengan pengguna, semua tanpa harus membangun komponen ini dari awal.

**Contoh kode**. Mari kita lihat contoh bagaimana Anda dapat menggunakan Microsoft Agent Framework dengan `FoundryChatClient` agar model merespons input pengguna dengan pemanggilan alat:

``` python
# Contoh Microsoft Agent Framework Python

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Definisikan fungsi alat contoh untuk memesan perjalanan
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Contoh keluaran: Penerbangan Anda ke New York pada 1 Januari 2025 telah berhasil dipesan. Selamat jalan! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Apa yang bisa Anda lihat dari contoh ini adalah bagaimana Anda dapat memanfaatkan parser pra-bangun untuk mengekstrak informasi kunci dari input pengguna, seperti asal, tujuan, dan tanggal dari permintaan pemesanan penerbangan. Pendekatan modular ini memungkinkan Anda untuk fokus pada logika tingkat tinggi.

### Manfaatkan Alat Kolaboratif

Kerangka kerja seperti Microsoft Agent Framework memfasilitasi pembuatan banyak agen yang dapat bekerja sama.

**Bagaimana tim dapat menggunakan ini**: Tim dapat merancang agen dengan peran dan tugas tertentu, memungkinkan mereka untuk menguji dan menyempurnakan alur kerja kolaboratif dan meningkatkan efisiensi sistem secara keseluruhan.

**Cara kerjanya dalam praktik**: Anda dapat membuat tim agen di mana setiap agen memiliki fungsi khusus, seperti pengambilan data, analisis, atau pengambilan keputusan. Agen-agen ini dapat berkomunikasi dan berbagi informasi untuk mencapai tujuan bersama, seperti menjawab pertanyaan pengguna atau menyelesaikan tugas.

**Contoh kode (Microsoft Agent Framework)**:

```python
# Membuat beberapa agen yang bekerja bersama menggunakan Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Agen Pengambilan Data
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Agen Analisis Data
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Menjalankan agen secara berurutan pada sebuah tugas
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Apa yang Anda lihat dalam kode sebelumnya adalah bagaimana Anda dapat membuat tugas yang melibatkan beberapa agen yang bekerja bersama untuk menganalisis data. Setiap agen melakukan fungsi khusus, dan tugas dilaksanakan dengan mengoordinasikan agen agar mencapai hasil yang diinginkan. Dengan menciptakan agen khusus dengan peran tertentu, Anda dapat meningkatkan efisiensi dan kinerja tugas.

### Belajar secara Waktu Nyata

Kerangka kerja canggih menyediakan kemampuan untuk pemahaman konteks dan adaptasi waktu nyata.

**Bagaimana tim dapat menggunakan ini**: Tim dapat menerapkan loop umpan balik di mana agen belajar dari interaksi dan menyesuaikan perilaku mereka secara dinamis, menghasilkan peningkatan dan penyempurnaan kemampuan yang berkesinambungan.

**Cara kerjanya dalam praktik**: Agen dapat menganalisis umpan balik pengguna, data lingkungan, dan hasil tugas untuk memperbarui basis pengetahuan mereka, menyesuaikan algoritma pengambilan keputusan, dan meningkatkan kinerja seiring waktu. Proses pembelajaran iteratif ini memungkinkan agen beradaptasi dengan kondisi yang berubah dan preferensi pengguna, meningkatkan efektivitas sistem secara keseluruhan.

## Apa perbedaan antara Microsoft Agent Framework dan Microsoft Foundry Agent Service?

Ada banyak cara untuk membandingkan pendekatan ini, tetapi mari kita lihat beberapa perbedaan utama dalam hal desain, kemampuan, dan kasus penggunaan target:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework menyediakan SDK yang disederhanakan untuk membangun agen AI menggunakan `FoundryChatClient`. Ini memungkinkan pengembang untuk membuat agen yang memanfaatkan model Azure OpenAI dengan pemanggilan alat bawaan, manajemen percakapan, dan keamanan kelas perusahaan melalui identitas Azure.

**Kasus Penggunaan**: Membangun agen AI siap produksi dengan penggunaan alat, alur kerja multi-langkah, dan skenario integrasi perusahaan.

Berikut beberapa konsep inti penting dari Microsoft Agent Framework:

- **Agen**. Agen dibuat melalui `FoundryChatClient` dan dikonfigurasi dengan nama, instruksi, dan alat. Agen dapat:
  - **Memproses pesan pengguna** dan menghasilkan respons menggunakan model Azure OpenAI.
  - **Memanggil alat** secara otomatis berdasarkan konteks percakapan.
  - **Mempertahankan status percakapan** sepanjang berbagai interaksi.

  Berikut adalah cuplikan kode yang menunjukkan cara membuat agen:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Alat**. Kerangka kerja mendukung pendefinisian alat sebagai fungsi Python yang dapat dipanggil agen secara otomatis. Alat didaftarkan saat membuat agen:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Koordinasi Multi-Agen**. Anda dapat membuat beberapa agen dengan spesialisasi berbeda dan mengoordinasikan kerja mereka:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Integrasi Identitas Azure**. Kerangka kerja menggunakan `AzureCliCredential` (atau `DefaultAzureCredential`) untuk otentikasi aman tanpa kunci, menghilangkan kebutuhan mengelola kunci API secara langsung.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service adalah tambahan yang lebih baru, diperkenalkan di Microsoft Ignite 2024. Ini memungkinkan pengembangan dan penyebaran agen AI dengan model yang lebih fleksibel, seperti langsung memanggil LLM open-source seperti Llama 3, Mistral, dan Cohere.

Microsoft Foundry Agent Service menyediakan mekanisme keamanan perusahaan yang lebih kuat dan metode penyimpanan data, sehingga cocok untuk aplikasi perusahaan. 

Ia bekerja langsung dengan Microsoft Agent Framework untuk membangun dan menyebarkan agen.

Layanan ini saat ini berada dalam Pratinjau Publik dan mendukung Python serta C# untuk membangun agen.

Menggunakan Microsoft Foundry Agent Service Python SDK, kita bisa membuat agen dengan alat yang didefinisikan pengguna:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Mendefinisikan fungsi alat
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Konsep Inti

Microsoft Foundry Agent Service memiliki konsep inti berikut:

- **Agen**. Microsoft Foundry Agent Service terintegrasi dengan Microsoft Foundry. Dalam Microsoft Foundry, Agen AI bertindak sebagai microservice "pintar" yang dapat digunakan untuk menjawab pertanyaan (RAG), melakukan aksi, atau sepenuhnya mengotomatisasi alur kerja. Ini dicapai dengan menggabungkan kekuatan model AI generatif dengan alat yang memungkinkan akses dan interaksi dengan sumber data dunia nyata. Berikut contoh agen:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Dalam contoh ini, agen dibuat dengan model `gpt-4.1-mini`, nama `my-agent`, dan instruksi `You are helpful agent`. Agen dilengkapi dengan alat dan sumber daya untuk melakukan tugas interpretasi kode.

- **Thread dan pesan**. Thread adalah konsep penting lainnya. Ini mewakili percakapan atau interaksi antara agen dan pengguna. Thread dapat digunakan untuk melacak kemajuan percakapan, menyimpan informasi konteks, dan mengelola status interaksi. Berikut contoh thread:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Minta agen untuk melakukan pekerjaan pada thread
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Ambil dan catat semua pesan untuk melihat respons agen
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Dalam kode sebelumnya, thread dibuat. Setelah itu, pesan dikirim ke thread. Dengan memanggil `create_and_process_run`, agen diminta untuk melakukan pekerjaan pada thread tersebut. Akhirnya, pesan diambil dan dicatat untuk melihat respons agen. Pesan menunjukkan kemajuan percakapan antara pengguna dan agen. Penting juga memahami bahwa pesan dapat berjenis berbeda seperti teks, gambar, atau file, yang merupakan hasil kerja agen seperti misalnya tanggapan berupa gambar atau teks. Sebagai pengembang, Anda dapat menggunakan informasi ini untuk lebih memproses respons atau menampilkannya ke pengguna.

- **Integrasi dengan Microsoft Agent Framework**. Microsoft Foundry Agent Service bekerja mulus dengan Microsoft Agent Framework, yang berarti Anda dapat membangun agen menggunakan `FoundryChatClient` dan menyebarkannya melalui Agent Service untuk skenario produksi.

**Kasus Penggunaan**: Microsoft Foundry Agent Service dirancang untuk aplikasi perusahaan yang memerlukan penyebaran agen AI yang aman, skalabel, dan fleksibel.

## Apa perbedaan antara pendekatan ini?
 
Sepertinya ada tumpang tindih, tetapi ada beberapa perbedaan utama dalam hal desain, kemampuan, dan kasus penggunaan target:
 
- **Microsoft Agent Framework (MAF)**: SDK siap produksi untuk membangun agen AI. Menyediakan API yang sederhana untuk membuat agen dengan pemanggilan alat, manajemen percakapan, dan integrasi identitas Azure.
- **Microsoft Foundry Agent Service**: Platform dan layanan penyebaran dalam Microsoft Foundry untuk agen. Menawarkan konektivitas bawaan ke layanan seperti Azure OpenAI, Azure AI Search, Bing Search dan eksekusi kode.
 
Masih bingung memilih yang mana?

### Kasus Penggunaan
 
Mari kita lihat apakah kami bisa membantu Anda dengan membahas beberapa kasus penggunaan umum:
 
> T: Saya membangun aplikasi agen AI produksi dan ingin mulai dengan cepat
>

>J: Microsoft Agent Framework adalah pilihan yang bagus. Ini menyediakan API Pythonik sederhana melalui `FoundryChatClient` yang memungkinkan Anda mendefinisikan agen dengan alat dan instruksi hanya dengan beberapa baris kode.

>T: Saya membutuhkan penyebaran kelas perusahaan dengan integrasi Azure seperti Search dan eksekusi kode
>
> J: Microsoft Foundry Agent Service adalah yang paling cocok. Ini adalah layanan platform yang menyediakan kemampuan bawaan untuk banyak model, Azure AI Search, Bing Search dan Azure Functions. Memudahkan membangun agen Anda di Portal Foundry dan menyebarkannya secara skala besar.
 
> T: Saya masih bingung, beri saya satu opsi saja
>
> J: Mulailah dengan Microsoft Agent Framework untuk membangun agen Anda, lalu gunakan Microsoft Foundry Agent Service ketika Anda perlu menyebarkan dan menskalakan mereka dalam produksi. Pendekatan ini memungkinkan Anda iterasi cepat pada logika agen sementara memiliki jalur jelas menuju penyebaran perusahaan.
 
Mari kita rangkum perbedaan utama dalam sebuah tabel:

| Kerangka Kerja | Fokus | Konsep Inti | Kasus Penggunaan |
| --- | --- | --- | --- |
| Microsoft Agent Framework | SDK agen yang disederhanakan dengan pemanggilan alat | Agen, Alat, Identitas Azure | Membangun agen AI, penggunaan alat, alur kerja multi-langkah |
| Microsoft Foundry Agent Service | Model fleksibel, keamanan perusahaan, Pembuatan kode, Pemanggilan alat | Modularitas, Kolaborasi, Orkestrasi Proses | Penyebaran agen AI yang aman, skalabel, dan fleksibel |

## Bisakah saya mengintegrasikan alat ekosistem Azure yang sudah ada secara langsung, atau perlu solusi mandiri?


Jawabannya adalah iya, Anda dapat mengintegrasikan alat ekosistem Azure yang sudah ada langsung dengan Microsoft Foundry Agent Service terutama, karena layanan ini telah dibuat untuk bekerja mulus dengan layanan Azure lainnya. Anda bisa, misalnya, mengintegrasikan Bing, Azure AI Search, dan Azure Functions. Ada juga integrasi mendalam dengan Microsoft Foundry.

Microsoft Agent Framework juga terintegrasi dengan layanan Azure melalui `FoundryChatClient` dan identitas Azure, memungkinkan Anda memanggil layanan Azure langsung dari alat agen Anda.

## Contoh Kode

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Punya Pertanyaan Lebih Lanjut tentang AI Agent Frameworks?

Bergabunglah di [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) untuk bertemu dengan pelajar lain, mengikuti jam kantor, dan mendapatkan jawaban atas pertanyaan AI Agents Anda.

## Referensi

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Pelajaran Sebelumnya

[Pengantar AI Agents dan Kasus Penggunaan Agen](../01-intro-to-ai-agents/README.md)

## Pelajaran Selanjutnya

[Memahami Pola Desain Agentic](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->