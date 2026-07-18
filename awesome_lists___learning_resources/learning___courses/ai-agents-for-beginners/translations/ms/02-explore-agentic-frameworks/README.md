[![Meneroka Rangka Kerja Ejen AI](../../../translated_images/ms/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Klik imej di atas untuk menonton video pelajaran ini)_

# Terokai Rangka Kerja Ejen AI

Rangka kerja ejen AI adalah platform perisian yang direka untuk memudahkan penciptaan, pelaksanaan, dan pengurusan ejen AI. Rangka kerja ini menyediakan pembangun dengan komponen pra-bina, abstraksi, dan alat yang mempermudah pembangunan sistem AI yang kompleks.

Rangka kerja ini membantu pembangun menumpukan pada aspek unik aplikasi mereka dengan menyediakan pendekatan standar kepada cabaran biasa dalam pembangunan ejen AI. Ia meningkatkan kebolehlaksanaan, aksesibiliti, dan kecekapan dalam membina sistem AI.

## Pengenalan 

Pelajaran ini akan meliputi:

- Apakah Rangka Kerja Ejen AI dan apa yang boleh dicapai oleh pembangun dengan mereka?
- Bagaimana pasukan boleh menggunakan ini untuk mencipta prototaip dengan cepat, ulang kaji, dan meningkatkan keupayaan ejen mereka?
- Apakah perbezaan antara rangka kerja dan alat yang dicipta oleh Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> dan <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Bolehkah saya mengintegrasikan alat ekosistem Azure saya yang sedia ada secara langsung, atau adakah saya memerlukan penyelesaian berdiri sendiri?
- Apakah Microsoft Foundry Agent Service dan bagaimana ia membantu saya?

## Matlamat pembelajaran

Matlamat pelajaran ini adalah untuk membantu anda memahami:

- Peranan Rangka Kerja Ejen AI dalam pembangunan AI.
- Cara menggunakan Rangka Kerja Ejen AI untuk membina ejen pintar.
- Keupayaan utama yang disediakan oleh Rangka Kerja Ejen AI.
- Perbezaan antara Microsoft Agent Framework dan Microsoft Foundry Agent Service.

## Apakah Rangka Kerja Ejen AI dan apa yang ia benarkan pembangun lakukan?

Rangka Kerja AI Tradisional boleh membantu anda mengintegrasikan AI ke dalam aplikasi anda dan menjadikan aplikasi ini lebih baik dengan cara berikut:

- **Personalisasi**: AI boleh menganalisis tingkah laku dan keutamaan pengguna untuk menyediakan cadangan, kandungan, dan pengalaman yang diperibadikan.
Contoh: Perkhidmatan penstriman seperti Netflix menggunakan AI untuk mencadangkan filem dan rancangan berdasarkan sejarah tontonan, meningkatkan penglibatan dan kepuasan pengguna.
- **Automasi dan Kecekapan**: AI boleh mengautomasikan tugas berulang, mengalirkan aliran kerja, dan meningkatkan kecekapan operasi.
Contoh: Aplikasi perkhidmatan pelanggan menggunakan chatbot berkuasa AI untuk menangani pertanyaan biasa, mengurangkan masa tindak balas dan membebaskan ejen manusia untuk isu yang lebih kompleks.
- **Pengalaman Pengguna yang Ditingkatkan**: AI boleh memperbaiki pengalaman pengguna keseluruhan dengan menyediakan ciri pintar seperti pengecaman suara, pemprosesan bahasa semula jadi, dan teks ramalan.
Contoh: Pembantu maya seperti Siri dan Google Assistant menggunakan AI untuk memahami dan membalas arahan suara, memudahkan pengguna berinteraksi dengan peranti mereka.

### Semuanya kedengaran hebat, jadi kenapa kita perlukan Rangka Kerja Ejen AI?

Rangka kerja ejen AI mewakili sesuatu yang lebih dari sekadar rangka kerja AI. Mereka direka untuk membolehkan penciptaan ejen pintar yang boleh berinteraksi dengan pengguna, ejen lain, dan persekitaran untuk mencapai matlamat tertentu. Ejen ini boleh menunjukkan tingkah laku autonomi, membuat keputusan, dan menyesuaikan diri dengan keadaan yang berubah. Mari lihat beberapa keupayaan utama yang dibolehkan oleh Rangka Kerja Ejen AI:

- **Kerjasama dan Penyelarasan Ejen**: Membolehkan penciptaan pelbagai ejen AI yang boleh bekerjasama, berkomunikasi, dan menyelaraskan untuk menyelesaikan tugasan kompleks.
- **Automasi dan Pengurusan Tugasan**: Menyediakan mekanisme untuk mengautomasikan aliran kerja berbilang langkah, delegasi tugasan, dan pengurusan tugasan dinamik antara ejen.
- **Pemahaman Kontekstual dan Penyesuaian**: Melengkapi ejen dengan kemampuan untuk memahami konteks, menyesuaikan diri dengan persekitaran yang berubah, dan membuat keputusan berdasarkan maklumat masa nyata.

Jadi secara ringkas, ejen membenarkan anda melakukan lebih banyak, membawa automasi ke tahap seterusnya, untuk mencipta sistem pintar yang boleh menyesuaikan diri dan belajar dari persekitaran mereka.

## Bagaimana untuk mencipta prototaip dengan cepat, ulang kaji, dan meningkatkan keupayaan ejen?

Lanskap ini bergerak pantas, tetapi terdapat beberapa perkara yang biasa di kebanyakan Rangka Kerja Ejen AI yang boleh membantu anda mencipta prototaip dan ulang kaji dengan cepat iaitu komponen modul, alat kolaboratif, dan pembelajaran masa nyata. Mari kita terokai ini:

- **Gunakan Komponen Modular**: SDK AI menawarkan komponen pra-bina seperti penyambung AI dan Memori, panggilan fungsi menggunakan bahasa semula jadi atau plugin kod, templat arahan, dan banyak lagi.
- **Manfaatkan Alat Kolaboratif**: Reka bentuk ejen dengan peranan dan tugasan khusus, membolehkan mereka menguji dan memperbaiki aliran kerja kolaboratif.
- **Belajar Secara Masa Nyata**: Laksanakan gelung maklum balas di mana ejen belajar dari interaksi dan menyesuaikan tingkah laku mereka secara dinamik.

### Gunakan Komponen Modular

SDK seperti Microsoft Agent Framework menawarkan komponen pra-bina seperti penyambung AI, definisi alat, dan pengurusan ejen.

**Bagaimana pasukan boleh menggunakan ini**: Pasukan boleh dengan cepat menyusun komponen ini untuk mencipta prototaip fungsional tanpa perlu bermula dari awal, membolehkan eksperimen dan ulang kaji yang pantas.

**Bagaimana ia berfungsi dalam amalan**: Anda boleh menggunakan parser pra-bina untuk mengekstrak maklumat daripada input pengguna, modul memori untuk menyimpan dan mendapatkan data, dan penjana arahan untuk berinteraksi dengan pengguna, semuanya tanpa perlu membina komponen ini dari awal.

**Contoh kod**. Mari lihat contoh bagaimana anda boleh menggunakan Microsoft Agent Framework dengan `FoundryChatClient` untuk membolehkan model bertindak balas terhadap input pengguna dengan panggilan alat:

``` python
# Contoh Microsoft Agent Framework Python

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Definisikan fungsi alatan contoh untuk menempah perjalanan
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
    # Output contoh: Penerbangan anda ke New York pada 1 Januari 2025 telah berjaya ditempah. Selamat jalan! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Apa yang anda boleh lihat dari contoh ini adalah bagaimana anda boleh memanfaatkan parser pra-bina untuk mengekstrak maklumat utama dari input pengguna, seperti asal, destinasi, dan tarikh permintaan tempahan penerbangan. Pendekatan modular ini membolehkan anda menumpukan pada logik peringkat tinggi.

### Manfaatkan Alat Kolaboratif

Rangka kerja seperti Microsoft Agent Framework memudahkan penciptaan beberapa ejen yang boleh bekerjasama.

**Bagaimana pasukan boleh menggunakan ini**: Pasukan boleh mereka bentuk ejen dengan peranan dan tugasan khusus, membolehkan mereka menguji dan memperbaiki aliran kerja kolaboratif serta meningkatkan kecekapan sistem keseluruhan.

**Bagaimana ia berfungsi dalam amalan**: Anda boleh mencipta satu pasukan ejen di mana setiap ejen mempunyai fungsi khusus, seperti mendapatkan data, analisis, atau membuat keputusan. Ejen-ejen ini boleh berkomunikasi dan berkongsi maklumat untuk mencapai matlamat bersama, seperti menjawab pertanyaan pengguna atau menyiapkan tugasan.

**Contoh kod (Microsoft Agent Framework)**:

```python
# Mewujudkan beberapa agen yang bekerja bersama menggunakan Rangka Kerja Agen Microsoft

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

# Jalankan agen secara berturutan pada satu tugasan
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Apa yang anda lihat dalam kod sebelum ini adalah bagaimana anda boleh mencipta tugasan yang melibatkan pelbagai ejen yang bekerjasama untuk menganalisis data. Setiap ejen melaksanakan fungsi tertentu, dan tugasan itu dilaksanakan dengan menyelaraskan ejen untuk mencapai hasil yang diinginkan. Dengan mencipta ejen khusus dengan peranan khusus, anda boleh meningkatkan kecekapan dan prestasi tugasan.

### Belajar Secara Masa Nyata

Rangka kerja maju menyediakan keupayaan untuk pemahaman konteks masa nyata dan penyesuaian.

**Bagaimana pasukan boleh menggunakan ini**: Pasukan boleh melaksanakan gelung maklum balas di mana ejen belajar dari interaksi dan menyesuaikan tingkah laku mereka secara dinamik, membawa kepada penambahbaikan berterusan dan penyempurnaan keupayaan.

**Bagaimana ia berfungsi dalam amalan**: Ejen boleh menganalisis maklum balas pengguna, data persekitaran, dan hasil tugasan untuk mengemas kini pangkalan pengetahuan mereka, menyesuaikan algoritma membuat keputusan, dan meningkatkan prestasi dari masa ke masa. Proses pembelajaran ulang ini membolehkan ejen menyesuaikan diri dengan keadaan yang berubah dan keutamaan pengguna, meningkatkan keberkesanan sistem secara keseluruhan.

## Apakah perbezaan antara Microsoft Agent Framework dan Microsoft Foundry Agent Service?

Terdapat banyak cara untuk membandingkan pendekatan ini, tetapi mari lihat beberapa perbezaan utama dari segi reka bentuk, keupayaan, dan kes penggunaan sasaran:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework menyediakan SDK yang dipermudahkan untuk membina ejen AI menggunakan `FoundryChatClient`. Ia membolehkan pembangun mencipta ejen yang menggunakan model Azure OpenAI dengan panggilan alat terbina, pengurusan perbualan, dan keselamatan peringkat perusahaan melalui identiti Azure.

**Kes Penggunaan**: Membina ejen AI siap produksi dengan penggunaan alat, aliran kerja berbilang langkah, dan senario integrasi perusahaan.

Berikut adalah beberapa konsep teras penting Microsoft Agent Framework:

- **Ejen**. Ejen dicipta melalui `FoundryChatClient` dan dikonfigurasi dengan nama, arahan, dan alat. Ejen boleh:
  - **Memproses mesej pengguna** dan menghasilkan respons menggunakan model Azure OpenAI.
  - **Memanggil alat** secara automatik berdasarkan konteks perbualan.
  - **Mengekalkan keadaan perbualan** merentasi pelbagai interaksi.

  Berikut adalah potongan kod yang menunjukkan cara mencipta ejen:

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

- **Alat**. Rangka kerja menyokong definisi alat sebagai fungsi Python yang boleh dipanggil secara automatik oleh ejen. Alat didaftarkan semasa mencipta ejen:

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

- **Penyelarasan Multi-Ejen**. Anda boleh mencipta pelbagai ejen dengan kepakaran berbeza dan menyelaraskan kerja mereka:

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

- **Integrasi Identiti Azure**. Rangka kerja menggunakan `AzureCliCredential` (atau `DefaultAzureCredential`) untuk pengesahan selamat tanpa kunci, menghapuskan keperluan untuk mengurus kunci API secara langsung.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service adalah penambahan yang lebih baru, diperkenalkan di Microsoft Ignite 2024. Ia membolehkan pembangunan dan pelaksanaan ejen AI dengan model yang lebih fleksibel, seperti memanggil terus LLM sumber terbuka seperti Llama 3, Mistral, dan Cohere.

Microsoft Foundry Agent Service menyediakan mekanisme keselamatan perusahaan yang lebih kukuh dan kaedah penyimpanan data, menjadikannya sesuai untuk aplikasi perusahaan. 

Ia berfungsi secara terus dengan Microsoft Agent Framework untuk membina dan melaksanakan ejen.

Perkhidmatan ini kini dalam Pra-tontonan Awam dan menyokong Python serta C# untuk membina ejen.

Menggunakan SDK Python Microsoft Foundry Agent Service, kita boleh mencipta ejen dengan alat yang ditakrifkan pengguna:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Definisikan fungsi alat
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

### Konsep teras

Microsoft Foundry Agent Service mempunyai konsep teras berikut:

- **Ejen**. Microsoft Foundry Agent Service berintegrasi dengan Microsoft Foundry. Dalam Microsoft Foundry, Ejen AI berfungsi sebagai perkhidmatan mikro "pintar" yang boleh digunakan untuk menjawab soalan (RAG), melaksanakan tindakan, atau mengautomasikan aliran kerja sepenuhnya. Ia mencapai ini dengan menggabungkan kuasa model AI generatif dengan alat yang membolehkan ia mengakses dan berinteraksi dengan sumber data dunia nyata. Berikut adalah contoh ejen:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Dalam contoh ini, ejen dicipta dengan model `gpt-4.1-mini`, nama `my-agent`, dan arahan `You are helpful agent`. Ejen dilengkapi dengan alat dan sumber untuk melaksanakan tugas tafsiran kod.

- **Thread dan mesej**. Thread adalah konsep penting lain. Ia mewakili perbualan atau interaksi antara ejen dan pengguna. Thread boleh digunakan untuk menjejak kemajuan perbualan, menyimpan maklumat konteks, dan mengurus keadaan interaksi. Berikut adalah contoh thread:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Minta ejen untuk melakukan kerja pada benang
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Dapatkan dan log semua mesej untuk melihat tindak balas ejen
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Dalam kod sebelumnya, sebuah thread dicipta. Selepas itu, mesej dihantar ke thread tersebut. Dengan memanggil `create_and_process_run`, ejen diminta untuk melakukan kerja pada thread itu. Akhirnya, mesej diambil dan dicatat untuk melihat respons ejen. Mesej menunjukkan kemajuan perbualan antara pengguna dan ejen. Penting juga untuk memahami bahawa mesej boleh dalam pelbagai jenis seperti teks, imej, atau fail, iaitu kerja ejen telah menghasilkan contohnya imej atau respons teks. Sebagai pembangun, anda kemudian boleh menggunakan maklumat ini untuk memproses lanjut respons atau memaparkannya kepada pengguna.

- **Integrasi dengan Microsoft Agent Framework**. Microsoft Foundry Agent Service berfungsi dengan lancar dengan Microsoft Agent Framework, yang bermaksud anda boleh membina ejen menggunakan `FoundryChatClient` dan melaksanakannya melalui Agent Service untuk senario produksi.

**Kes Penggunaan**: Microsoft Foundry Agent Service direka untuk aplikasi perusahaan yang memerlukan penyebaran ejen AI yang selamat, skala, dan fleksibel.

## Apakah perbezaan antara pendekatan ini?
 
Ia kedengaran seolah-olah ada pertindihan, tetapi terdapat beberapa perbezaan utama dari segi reka bentuk, keupayaan, dan kes penggunaan sasaran:
 
- **Microsoft Agent Framework (MAF)**: Adalah SDK sedia produksi untuk membina ejen AI. Ia menyediakan API yang dipermudahkan untuk mencipta ejen dengan panggilan alat, pengurusan perbualan, dan integrasi identiti Azure.
- **Microsoft Foundry Agent Service**: Adalah platform dan perkhidmatan pelaksanaan dalam Microsoft Foundry untuk ejen. Ia menawarkan sambungan terbina kepada perkhidmatan seperti Azure OpenAI, Azure AI Search, Bing Search dan pelaksanaan kod.
 
Masih tidak pasti yang mana satu hendak dipilih?

### Kes Penggunaan
 
Mari kita lihat jika kita boleh membantu anda dengan melalui beberapa kes penggunaan biasa:
 
> T: Saya membina aplikasi ejen AI produksi dan mahu mula dengan cepat
>

>J: Microsoft Agent Framework adalah pilihan yang baik. Ia menyediakan API Python yang mudah melalui `FoundryChatClient` yang membolehkan anda mentakrifkan ejen dengan alat dan arahan hanya dalam beberapa baris kod.

>T: Saya perlukan pelaksanaan peringkat perusahaan dengan integrasi Azure seperti Search dan pelaksanaan kod
>
> J: Microsoft Foundry Agent Service adalah yang paling sesuai. Ia adalah perkhidmatan platform yang menyediakan keupayaan terbina untuk pelbagai model, Azure AI Search, Bing Search, dan Azure Functions. Ia memudahkan anda membina ejen dalam Foundry Portal dan melaksanakan mereka pada skala.
 
> T: Saya masih keliru, beri saya satu pilihan sahaja
>
> J: Mulakan dengan Microsoft Agent Framework untuk membina ejen anda, dan kemudian gunakan Microsoft Foundry Agent Service apabila anda perlu melaksanakan dan memperbesarkan mereka dalam produksi. Pendekatan ini membolehkan anda mengulangi logik ejen dengan cepat sambil mempunyai laluan jelas ke pelaksanaan perusahaan.
 
Mari kita ringkaskan perbezaan utama dalam jadual:

| Rangka Kerja | Fokus | Konsep Teras | Kes Penggunaan |
| --- | --- | --- | --- |
| Microsoft Agent Framework | SDK ejen yang dipermudahkan dengan panggilan alat | Ejen, Alat, Identiti Azure | Membina ejen AI, penggunaan alat, aliran kerja berbilang langkah |
| Microsoft Foundry Agent Service | Model fleksibel, keselamatan perusahaan, penjanaan kod, panggilan alat | Modularity, Kolaborasi, Orkestrasi Proses | Penyebaran ejen AI yang selamat, skala, dan fleksibel |

## Bolehkah saya mengintegrasikan alat ekosistem Azure sedia ada saya secara langsung, atau saya perlu gunakan penyelesaian berdiri sendiri?


Jawapannya adalah ya, anda boleh mengintegrasikan alat ekosistem Azure sedia ada anda secara langsung dengan Microsoft Foundry Agent Service terutama sekali, kerana ia dibina untuk berfungsi lancar dengan perkhidmatan Azure yang lain. Contohnya, anda boleh mengintegrasikan Bing, Azure AI Search, dan Azure Functions. Terdapat juga integrasi mendalam dengan Microsoft Foundry.

Microsoft Agent Framework juga berintegrasi dengan perkhidmatan Azure melalui `FoundryChatClient` dan identiti Azure, membolehkan anda memanggil perkhidmatan Azure secara langsung dari alat ejen anda.

## Contoh Kod

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Ada Soalan Lagi tentang AI Agent Frameworks?

Sertai [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) untuk berjumpa dengan pelajar lain, menghadiri waktu pejabat dan dapatkan jawapan untuk soalan AI Agents anda.

## Rujukan

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Perkhidmatan Ejen Azure</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Pelajaran Sebelumnya

[Pengenalan kepada Ejen AI dan Kes Penggunaan Ejen](../01-intro-to-ai-agents/README.md)

## Pelajaran Seterusnya

[Memahami Corak Reka Bentuk Agentic](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->