[![Cara Mendesain Agen AI yang Baik](../../../translated_images/id/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Klik gambar di atas untuk menonton video pelajaran ini)_

# Pola Desain Penggunaan Alat

Alat menarik karena memungkinkan agen AI memiliki rentang kemampuan yang lebih luas. Alih-alih agen hanya memiliki set tindakan terbatas yang bisa dilakukan, dengan menambahkan alat, agen kini dapat melakukan berbagai tindakan. Dalam bab ini, kita akan melihat Pola Desain Penggunaan Alat, yang menjelaskan bagaimana agen AI dapat menggunakan alat spesifik untuk mencapai tujuan mereka.

## Pendahuluan

Dalam pelajaran ini, kami berusaha menjawab pertanyaan-pertanyaan berikut:

- Apa itu pola desain penggunaan alat?
- Kasus penggunaan apa yang dapat diterapkan?
- Apa elemen/bangunan blok yang diperlukan untuk menerapkan pola desain ini?
- Apa pertimbangan khusus ketika menggunakan Pola Desain Penggunaan Alat untuk membangun agen AI yang dapat dipercaya?

## Tujuan Pembelajaran

Setelah menyelesaikan pelajaran ini, Anda akan dapat:

- Mendefinisikan Pola Desain Penggunaan Alat dan tujuannya.
- Mengidentifikasi kasus penggunaan di mana Pola Desain Penggunaan Alat berlaku.
- Memahami elemen kunci yang diperlukan untuk menerapkan pola desain tersebut.
- Mengenali pertimbangan untuk memastikan kepercayaan dalam agen AI yang menggunakan pola desain ini.

## Apa itu Pola Desain Penggunaan Alat?

**Pola Desain Penggunaan Alat** berfokus pada memberikan kemampuan kepada LLM untuk berinteraksi dengan alat eksternal guna mencapai tujuan tertentu. Alat adalah kode yang dapat dijalankan oleh agen untuk melakukan tindakan. Sebuah alat bisa berupa fungsi sederhana seperti kalkulator, atau panggilan API ke layanan pihak ketiga seperti pencarian harga saham atau prakiraan cuaca. Dalam konteks agen AI, alat dirancang untuk dijalankan oleh agen sebagai respons terhadap **panggilan fungsi yang dihasilkan oleh model**.

## Kasus penggunaan apa yang dapat diterapkan?

Agen AI dapat memanfaatkan alat untuk menyelesaikan tugas kompleks, mengambil informasi, atau membuat keputusan. Pola desain penggunaan alat sering digunakan dalam skenario yang membutuhkan interaksi dinamis dengan sistem eksternal, seperti basis data, layanan web, atau interpreter kode. Kemampuan ini berguna untuk berbagai kasus penggunaan termasuk:

- **Pengambilan Informasi Dinamis:** Agen dapat melakukan kueri ke API eksternal atau basis data untuk mendapatkan data terkini (misalnya, kueri basis data SQLite untuk analisis data, mengambil harga saham atau informasi cuaca).
- **Eksekusi dan Interpretasi Kode:** Agen dapat menjalankan kode atau skrip untuk menyelesaikan masalah matematika, menghasilkan laporan, atau melakukan simulasi.
- **Otomatisasi Alur Kerja:** Mengotomatisasi alur kerja yang berulang atau multi-langkah dengan mengintegrasikan alat seperti penjadwal tugas, layanan email, atau pipeline data.
- **Dukungan Pelanggan:** Agen dapat berinteraksi dengan sistem CRM, platform tiket, atau basis pengetahuan untuk menyelesaikan pertanyaan pengguna.
- **Pembuatan dan Pengeditan Konten:** Agen dapat memanfaatkan alat seperti pemeriksa tata bahasa, peringkas teks, atau evaluator keamanan konten untuk membantu tugas pembuatan konten.

## Apa elemen/bangunan blok yang diperlukan untuk menerapkan pola desain penggunaan alat?

Bangunan blok ini memungkinkan agen AI melakukan berbagai tugas. Mari kita lihat elemen kunci yang diperlukan untuk menerapkan Pola Desain Penggunaan Alat:

- **Skema Fungsi/Alat**: Definisi rinci alat yang tersedia, termasuk nama fungsi, tujuan, parameter yang diperlukan, dan output yang diharapkan. Skema ini memungkinkan LLM untuk memahami alat apa saja yang tersedia dan bagaimana membangun permintaan yang valid.

- **Logika Pelaksanaan Fungsi**: Mengatur bagaimana dan kapan alat dipanggil berdasarkan niat pengguna dan konteks percakapan. Ini bisa mencakup modul perencana, mekanisme routing, atau alur kondisional yang menentukan penggunaan alat secara dinamis.

- **Sistem Penanganan Pesan**: Komponen yang mengelola alur percakapan antara input pengguna, respons LLM, panggilan alat, dan output alat.

- **Kerangka Integrasi Alat**: Infrastruktur yang menghubungkan agen dengan berbagai alat, baik itu fungsi sederhana atau layanan eksternal yang kompleks.

- **Penanganan Kesalahan & Validasi**: Mekanisme untuk menangani kegagalan dalam pelaksanaan alat, memvalidasi parameter, dan mengelola respons yang tak terduga.

- **Manajemen Status**: Melacak konteks percakapan, interaksi alat sebelumnya, dan data persisten untuk memastikan konsistensi sepanjang interaksi multi-giliran.

Selanjutnya, mari kita lihat lebih detail tentang Panggilan Fungsi/Alat.
 
### Panggilan Fungsi/Alat

Panggilan fungsi adalah cara utama kami memungkinkan Large Language Models (LLM) berinteraksi dengan alat. Anda sering akan melihat istilah 'Fungsi' dan 'Alat' digunakan secara bergantian karena 'fungsi' (blok kode yang dapat digunakan kembali) adalah 'alat' yang digunakan agen untuk menjalankan tugas. Agar kode fungsi dapat dijalankan, LLM harus membandingkan permintaan pengguna dengan deskripsi fungsi. Untuk melakukan ini, skema yang berisi deskripsi semua fungsi yang tersedia dikirim ke LLM. LLM kemudian memilih fungsi paling sesuai untuk tugas tersebut dan mengembalikan nama serta argumennya. Fungsi yang dipilih dijalankan, responsnya dikirim kembali ke LLM, yang menggunakan informasi itu untuk merespons permintaan pengguna.

Untuk pengembang yang ingin menerapkan panggilan fungsi untuk agen, Anda memerlukan:

1. Model LLM yang mendukung panggilan fungsi
2. Skema yang berisi deskripsi fungsi
3. Kode untuk setiap fungsi yang dideskripsikan

Mari kita gunakan contoh mendapatkan waktu saat ini di sebuah kota untuk menggambarkan:

1. **Inisialisasi LLM yang mendukung panggilan fungsi:**

    Tidak semua model mendukung panggilan fungsi, jadi penting untuk memeriksa apakah LLM yang Anda gunakan mendukungnya.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> mendukung panggilan fungsi. Kita dapat mulai dengan memulai klien OpenAI terhadap Azure OpenAI **Responses API** (endpoint stabil `/openai/v1/` — tanpa perlu `api_version`). 

    ```python
    # Inisialisasi klien OpenAI untuk Azure OpenAI (Respons API, endpoint v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Buat Skema Fungsi**:

    Selanjutnya kita akan mendefinisikan skema JSON yang berisi nama fungsi, deskripsi apa yang dilakukan fungsi, dan nama serta deskripsi parameter fungsi.
    Kita kemudian mengambil skema ini dan mengirimkannya ke klien yang dibuat sebelumnya, bersamaan dengan permintaan pengguna untuk mencari waktu di San Francisco. Yang penting dicatat adalah bahwa **pemanggilan alat** adalah apa yang dikembalikan, **bukan** jawaban akhir dari pertanyaan. Seperti yang disebutkan sebelumnya, LLM mengembalikan nama fungsi yang dipilih untuk tugas tersebut, dan argumen yang akan diteruskan kepadanya.

    ```python
    # Deskripsi fungsi untuk model membaca (format alat datar API Respon)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # Pesan pengguna awal
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Panggilan API pertama: Minta model untuk menggunakan fungsi
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # API Respon mengembalikan pemanggilan alat sebagai item function_call dalam response.output.
    # Tambahkan mereka ke percakapan sehingga model memiliki konteks penuh pada giliran berikutnya.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Kode fungsi yang diperlukan untuk menjalankan tugas:**

    Setelah LLM memilih fungsi mana yang perlu dijalankan, kode yang menjalankan tugas harus diimplementasikan dan dieksekusi.
    Kita dapat mengimplementasikan kode untuk mendapatkan waktu saat ini dalam Python. Kita juga perlu menulis kode untuk mengekstrak nama dan argumen dari response_message untuk mendapatkan hasil akhir.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # Menangani pemanggilan fungsi
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Mengembalikan hasil alat sebagai item function_call_output
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Panggilan API kedua: Dapatkan respons akhir dari model
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

Panggilan Fungsi adalah inti dari sebagian besar, jika tidak semua, desain penggunaan alat dalam agen, namun mengimplementasikannya dari awal bisa kadang menantang.
Seperti yang telah kita pelajari di [Pelajaran 2](../../../02-explore-agentic-frameworks), kerangka kerja agensik menyediakan bangunan blok siap pakai untuk mengimplementasikan penggunaan alat.
 
## Contoh Penggunaan Alat dengan Kerangka Kerja Agensik

Berikut beberapa contoh bagaimana Anda bisa mengimplementasikan Pola Desain Penggunaan Alat menggunakan berbagai kerangka kerja agensik:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> adalah kerangka AI open-source untuk membangun agen AI. Ini menyederhanakan proses penggunaan pemanggilan fungsi dengan memungkinkan Anda mendefinisikan alat sebagai fungsi Python dengan dekorator `@tool`. Kerangka kerja menangani komunikasi bolak-balik antara model dan kode Anda. Ia juga menyediakan akses ke alat siap pakai seperti Pencarian File dan Code Interpreter melalui `FoundryChatClient`.

Diagram berikut mengilustrasikan proses pemanggilan fungsi dengan Microsoft Agent Framework:

![function calling](../../../translated_images/id/functioncalling-diagram.a84006fc287f6014.webp)

Dalam Microsoft Agent Framework, alat didefinisikan sebagai fungsi yang dihias. Kita dapat mengubah fungsi `get_current_time` yang kita lihat sebelumnya menjadi alat dengan menggunakan dekorator `@tool`. Kerangka ini akan secara otomatis menyerialisasi fungsi dan parameternya, membuat skema untuk dikirim ke LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Buat klien
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Buat agen dan jalankan dengan alat tersebut
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> adalah kerangka kerja agensik yang lebih baru yang dirancang untuk memberdayakan pengembang membangun, menerapkan, dan mengskalakan agen AI yang berkualitas tinggi dan dapat diperluas secara aman tanpa perlu mengelola sumber daya komputasi dan penyimpanan dasar. Ini sangat berguna untuk aplikasi perusahaan karena merupakan layanan terkelola penuh dengan keamanan tingkat perusahaan.

Dibandingkan dengan pengembangan langsung menggunakan API LLM, Microsoft Foundry Agent Service menyediakan beberapa keuntungan, termasuk:

- Pemanggilan alat otomatis – tidak perlu mengurai panggilan alat, menjalankan alat, dan menangani respons; semua ini kini dilakukan di sisi server
- Data dikelola dengan aman – alih-alih mengelola status percakapan Anda sendiri, Anda dapat mengandalkan thread untuk menyimpan semua informasi yang dibutuhkan
- Alat siap pakai – Alat yang bisa Anda gunakan untuk berinteraksi dengan sumber data Anda, seperti Bing, Azure AI Search, dan Azure Functions.

Alat yang tersedia dalam Microsoft Foundry Agent Service dapat dibagi menjadi dua kategori:

1. Alat Pengetahuan:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Grounding dengan Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Pencarian File</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Alat Aksi:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Panggilan Fungsi</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Code Interpreter</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Alat yang didefinisikan oleh OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agent Service memungkinkan kita menggunakan alat-alat ini bersama-sama sebagai sebuah `toolset`. Ini juga memanfaatkan `threads` yang melacak riwayat pesan dari percakapan tertentu.

Bayangkan Anda adalah agen penjualan di perusahaan bernama Contoso. Anda ingin mengembangkan agen percakapan yang dapat menjawab pertanyaan tentang data penjualan Anda.

Gambar berikut mengilustrasikan bagaimana Anda bisa menggunakan Microsoft Foundry Agent Service untuk menganalisis data penjualan Anda:

![Agentic Service In Action](../../../translated_images/id/agent-service-in-action.34fb465c9a84659e.webp)

Untuk menggunakan alat-alat ini dengan layanan tersebut, kita dapat membuat klien dan mendefinisikan alat atau toolset. Untuk mengimplementasikannya secara praktis kita dapat menggunakan kode Python berikut. LLM akan dapat melihat toolset dan memutuskan apakah akan menggunakan fungsi buatan pengguna, `fetch_sales_data_using_sqlite_query`, atau Code Interpreter yang sudah dibuat tergantung pada permintaan pengguna.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fungsi fetch_sales_data_using_sqlite_query yang dapat ditemukan dalam file fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Inisialisasi toolset
toolset = ToolSet()

# Inisialisasi agen pemanggilan fungsi dengan fungsi fetch_sales_data_using_sqlite_query dan menambahkannya ke toolset
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Inisialisasi alat Interpreter Kode dan menambahkannya ke toolset.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Apa pertimbangan khusus saat menggunakan Pola Desain Penggunaan Alat untuk membangun agen AI yang dapat dipercaya?

Kekhawatiran umum dengan SQL yang dihasilkan secara dinamis oleh LLM adalah keamanan, terutama risiko injeksi SQL atau tindakan berbahaya, seperti penghapusan atau penyalahgunaan basis data. Walaupun kekhawatiran ini valid, hal ini dapat diatasi secara efektif dengan mengonfigurasi izin akses basis data dengan benar. Untuk sebagian besar basis data, ini melibatkan pengaturan basis data menjadi hanya-baca. Untuk layanan basis data seperti PostgreSQL atau Azure SQL, aplikasi harus diberikan peran hanya-baca (SELECT).

Menjalankan aplikasi di lingkungan yang aman semakin meningkatkan perlindungan. Dalam skenario perusahaan, data biasanya diekstraksi dan diubah dari sistem operasional ke basis data hanya-baca atau gudang data dengan skema yang ramah pengguna. Pendekatan ini memastikan data aman, dioptimalkan untuk performa dan aksesibilitas, dan aplikasi memiliki akses terbatas hanya-baca.

## Contoh Kode

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Punya Pertanyaan Lebih Lanjut tentang Pola Desain Penggunaan Alat?

Bergabunglah dengan [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) untuk bertemu dengan pelajar lain, mengikuti jam kantor, dan mendapatkan jawaban atas pertanyaan tentang Agen AI Anda.

## Sumber Daya Tambahan

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Workshop Layanan Agen Azure AI</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Workshop Penulis Kreatif Multi-Agen Contoso</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Ikhtisar Microsoft Agent Framework</a>


## Menguji Agen ini secara Singkat (Opsional)

Setelah Anda belajar untuk menyebarkan agen di [Pelajaran 16](../16-deploying-scalable-agents/README.md), Anda dapat menguji singkat `TravelToolAgent` pada pelajaran ini (apakah masih memanggil alat-alatnya dan menjawab?) dengan [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Lihat [`tests/README.md`](../tests/README.md) untuk cara menjalankannya.

## Pelajaran Sebelumnya

[Memahami Pola Desain Agentik](../03-agentic-design-patterns/README.md)

## Pelajaran Berikutnya

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->