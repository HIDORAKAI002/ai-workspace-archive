[![Cara Mereka Bentuk Ejen AI yang Baik](../../../translated_images/ms/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Klik imej di atas untuk menonton video pelajaran ini)_

# Corak Reka Bentuk Penggunaan Alat

Alat menarik kerana ia membenarkan ejen AI mempunyai rangkaian kemampuan yang lebih meluas. Daripada ejen hanya mempunyai set tindakan terhad yang boleh dilakukan, dengan menambah alat, ejen kini boleh melakukan pelbagai tindakan. Dalam bab ini, kita akan melihat pada Corak Reka Bentuk Penggunaan Alat, yang menerangkan bagaimana ejen AI dapat menggunakan alat khusus untuk mencapai matlamat mereka.

## Pengenalan

Dalam pelajaran ini, kita ingin menjawab soalan-soalan berikut:

- Apakah corak reka bentuk penggunaan alat?
- Apakah kes penggunaan yang boleh ia diterapkan?
- Apakah unsur/blok pembinaan yang diperlukan untuk melaksanakan corak reka bentuk ini?
- Apakah pertimbangan khas menggunakan Corak Reka Bentuk Penggunaan Alat untuk membina ejen AI yang boleh dipercayai?

## Matlamat Pembelajaran

Selepas menamatkan pelajaran ini, anda akan dapat:

- Mentakrifkan Corak Reka Bentuk Penggunaan Alat dan tujuannya.
- Mengenal pasti kes penggunaan di mana Corak Reka Bentuk Penggunaan Alat boleh digunakan.
- Memahami unsur utama yang diperlukan untuk melaksanakan corak reka bentuk.
- Mengenalpasti pertimbangan untuk memastikan kebolehpercayaan ejen AI yang menggunakan corak reka bentuk ini.

## Apakah Corak Reka Bentuk Penggunaan Alat?

**Corak Reka Bentuk Penggunaan Alat** memberi tumpuan kepada memberi LLM kebolehan untuk berinteraksi dengan alat luaran bagi mencapai matlamat khusus. Alat adalah kod yang boleh dilaksanakan oleh ejen untuk melakukan tindakan. Alat boleh jadi fungsi mudah seperti kalkulator, atau panggilan API ke perkhidmatan pihak ketiga seperti semakan harga saham atau ramalan cuaca. Dalam konteks ejen AI, alat direka untuk dilaksanakan oleh ejen sebagai tindak balas kepada **panggilan fungsi yang dijana oleh model**.

## Apakah kes penggunaan yang boleh ia diterapkan?

Ejen AI boleh menggunakan alat untuk melengkapkan tugas kompleks, mendapatkan maklumat, atau membuat keputusan. Corak reka bentuk penggunaan alat sering digunakan dalam situasi yang memerlukan interaksi dinamik dengan sistem luaran, seperti pangkalan data, perkhidmatan web, atau penterjemah kod. Kebolehan ini berguna untuk beberapa kes penggunaan termasuk:

- **Pengambilan Maklumat Dinamik:** Ejen boleh membuat kueri kepada API luaran atau pangkalan data untuk mendapatkan data terkini (contoh: membuat kueri kepada pangkalan data SQLite untuk analisis data, mendapatkan harga saham atau maklumat cuaca).
- **Pelaksanaan dan Tafsiran Kod:** Ejen boleh melaksanakan kod atau skrip untuk menyelesaikan masalah matematik, menghasilkan laporan, atau menjalankan simulasi.
- **Automasi Aliran Kerja:** Automasi kerja berulang atau pelbagai langkah dengan mengintegrasi alat seperti penyusun tugas, perkhidmatan emel, atau saluran data.
- **Sokongan Pelanggan:** Ejen boleh berinteraksi dengan sistem CRM, platform tiket, atau pangkalan pengetahuan untuk menyelesaikan pertanyaan pengguna.
- **Penjanaan dan Penyuntingan Kandungan:** Ejen boleh menggunakan alat seperti pemeriksa tatabahasa, peringkas teks, atau penilai keselamatan kandungan untuk membantu tugas penciptaan kandungan.

## Apakah unsur/blok pembinaan yang diperlukan untuk melaksanakan corak reka bentuk penggunaan alat?

Blok pembinaan ini membenarkan ejen AI melaksanakan pelbagai tugas. Mari lihat unsur utama yang diperlukan untuk melaksanakan Corak Reka Bentuk Penggunaan Alat:

- **Skema Fungsi/Alat**: Definisi terperinci alat yang boleh digunakan, termasuk nama fungsi, tujuan, parameter yang diperlukan, dan keluaran yang dijangka. Skema ini membolehkan LLM memahami alat yang tersedia dan cara membina permintaan yang sah.

- **Logik Pelaksanaan Fungsi**: Mengawal cara dan bila alat dipanggil berdasarkan niat pengguna dan konteks perbualan. Ini mungkin termasuk modul perancang, mekanisma penghantaran, atau aliran bersyarat yang menentukan penggunaan alat secara dinamik.

- **Sistem Pengendalian Mesej**: Komponen yang mengurus aliran perbualan antara input pengguna, respons LLM, panggilan alat, dan keluaran alat.

- **Rangka Kerja Integrasi Alat**: Infrastruktur yang menyambungkan ejen dengan pelbagai alat, sama ada fungsi mudah atau perkhidmatan luaran yang kompleks.

- **Pengurusan Ralat & Pengesahan**: Mekanisma untuk mengendalikan kegagalan pelaksanaan alat, mengesahkan parameter, dan mengawal respons yang tidak dijangka.

- **Pengurusan Keadaan**: Menjejak konteks perbualan, interaksi alat sebelum ini, dan data berterusan untuk memastikan konsistensi sepanjang interaksi berbilang pusingan.

Seterusnya, mari kita lihat Panggilan Fungsi/Alat dengan lebih terperinci.
 
### Panggilan Fungsi/Alat

Panggilan fungsi adalah cara utama bagi membolehkan Model Bahasa Besar (LLM) berinteraksi dengan alat. Anda akan kerap lihat 'Fungsi' dan 'Alat' digunakan secara bergantian kerana 'fungsi' (blok kod yang boleh digunakan semula) adalah 'alat' yang digunakan oleh ejen untuk melaksanakan tugas. Untuk kod fungsi dipanggil, LLM mesti membandingkan permintaan pengguna dengan penerangan fungsi tersebut. Untuk melakukan ini, skema yang mengandungi penerangan semua fungsi yang tersedia dihantar ke LLM. LLM kemudian memilih fungsi yang paling sesuai untuk tugas dan mengembalikan nama dan argumennya. Fungsi yang dipilih tersebut dipanggil, responnya dihantar kembali ke LLM yang menggunakan maklumat tersebut untuk membalas permintaan pengguna.

Untuk pembangun melaksanakan panggilan fungsi untuk ejen, anda memerlukan:

1. Model LLM yang menyokong panggilan fungsi
2. Skema yang mengandungi penerangan fungsi
3. Kod bagi setiap fungsi yang diterangkan

Mari kita gunakan contoh mendapatkan masa semasa di sebuah bandar untuk ilustrasi:

1. **Inisialisasi LLM yang menyokong panggilan fungsi:**

    Tidak semua model menyokong panggilan fungsi, jadi penting untuk memeriksa LLM yang anda gunakan. <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> menyokong panggilan fungsi. Kita boleh mulakan dengan memulakan klien OpenAI menggunakan Azure OpenAI **API Respons** (endpoint stabil `/openai/v1/` — tiada keperluan `api_version`).

    ```python
    # Inisialisasikan klien OpenAI untuk Azure OpenAI (API Respons, titik akhir v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Buat Skema Fungsi**:

    Seterusnya kita akan mentakrifkan skema JSON yang mengandungi nama fungsi, penerangan apa yang dilakukan fungsi itu, dan nama serta penerangan parameter fungsi.
    Kemudian kita akan memberi skema ini kepada klien yang tadi dibuat, bersama permintaan pengguna untuk mencari masa di San Francisco. Yang penting untuk diperhatikan ialah **panggilan alat** yang dikembalikan, **bukan** jawapan akhir kepada soalan tersebut. Seperti yang disebut sebelum ini, LLM mengembalikan nama fungsi yang dipilih untuk tugas dan argumen yang akan diberikan.

    ```python
    # Penerangan fungsi untuk model membaca (Format alat rata API Tindak Balas)
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
  
    # Mesej pengguna awal
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Panggilan API pertama: Minta model menggunakan fungsi
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # API Respons mengembalikan panggilan alat sebagai item function_call dalam response.output.
    # Tambahkan mereka ke perbualan supaya model mempunyai konteks penuh pada giliran seterusnya.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Kod fungsi yang diperlukan untuk melaksanakan tugas:**

    Setelah LLM memilih fungsi yang perlu dijalankan, kod yang melaksanakan tugas perlu diimplementasi dan dijalankan.
    Kita boleh implementasikan kod untuk mendapatkan masa semasa dalam Python. Kita juga perlu menulis kod untuk mengekstrak nama dan argumen dari response_message untuk mendapatkan hasil akhir.

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
    # Mengendalikan panggilan fungsi
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Kembalikan hasil alat sebagai item function_call_output
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

Panggilan Fungsi adalah teras kepada kebanyakan, jika tidak semua, reka bentuk penggunaan alat bagi ejen, namun melaksanakannya dari awal boleh jadi mencabar.
Seperti yang kita pelajari dalam [Pelajaran 2](../../../02-explore-agentic-frameworks), rangka kerja agentic menyediakan blok binaan siap untuk melaksanakan penggunaan alat.
 
## Contoh Penggunaan Alat dengan Rangka Kerja Agentic

Berikut adalah beberapa contoh bagaimana anda boleh melaksanakan Corak Reka Bentuk Penggunaan Alat menggunakan pelbagai rangka kerja agentic:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> adalah rangka kerja AI sumber terbuka untuk membina ejen AI. Ia memudahkan proses penggunaan panggilan fungsi dengan membenarkan anda mentakrifkan alat sebagai fungsi Python dengan dekorator `@tool`. Rangka kerja mengendalikan komunikasi dua hala antara model dan kod anda. Ia juga menyediakan akses ke alat siap guna seperti Carian Fail dan Penterjemah Kod melalui `FoundryChatClient`.

Rajah berikut menerangkan proses panggilan fungsi dengan Microsoft Agent Framework:

![panggilan fungsi](../../../translated_images/ms/functioncalling-diagram.a84006fc287f6014.webp)

Dalam Microsoft Agent Framework, alat ditakrifkan sebagai fungsi yang dihiasi. Kita boleh menukar fungsi `get_current_time` yang kita lihat sebelum ini menjadi alat dengan menggunakan dekorator `@tool`. Rangka kerja akan secara automatik menserialkan fungsi dan parameternya, menghasilkan skema untuk dihantar kepada LLM.

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

# Buat agen dan jalankan dengan alat
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> adalah rangka kerja agentic yang lebih baru direka untuk memberdayakan pembangun membina, mengedarkan, dan skala ejen AI berkualiti tinggi dan boleh diperluaskan dengan selamat tanpa perlu menguruskan sumber pengkomputeran dan penyimpanan yang mendasari. Ia sangat berguna untuk aplikasi perusahaan kerana ia adalah perkhidmatan yang diurus sepenuhnya dengan keselamatan tahap perusahaan.

Jika dibandingkan dengan pembangunan menggunakan API LLM secara langsung, Microsoft Foundry Agent Service memberikan beberapa kelebihan, termasuk:

- Panggilan alat automatik – tiada keperluan untuk mengurai panggilan alat, memanggil alat, dan mengendalikan respon; semua ini kini dilakukan di sisi pelayan
- Data yang diurus dengan selamat – daripada mengurus keadaan perbualan sendiri, anda boleh bergantung pada threads untuk menyimpan semua maklumat yang diperlukan
- Alat siap guna – Alat yang boleh anda guna untuk berinteraksi dengan sumber data anda, seperti Bing, Azure AI Search, dan Azure Functions.

Alat yang ada dalam Microsoft Foundry Agent Service boleh dibahagikan kepada dua kategori:

1. Alat Pengetahuan:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Penentuan dengan Carian Bing</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Carian Fail</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Alat Tindakan:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Panggilan Fungsi</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Penterjemah Kod</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Alat yang ditakrifkan OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Perkhidmatan Ejen membolehkan kita menggunakan alat-alat ini bersama sebagai sebuah `toolset`. Ia juga menggunakan `threads` yang menyimpan rekod sejarah mesej dari perbualan tertentu.

Bayangkan anda seorang ejen jualan di sebuah syarikat bernama Contoso. Anda ingin membangunkan ejen perbualan yang boleh menjawab soalan tentang data jualan anda.

Imej berikut menerangkan bagaimana anda boleh menggunakan Microsoft Foundry Agent Service untuk menganalisis data jualan anda:

![Perkhidmatan Agentic Dalam Tindakan](../../../translated_images/ms/agent-service-in-action.34fb465c9a84659e.webp)

Untuk menggunakan mana-mana alat ini dengan perkhidmatan, kita boleh mencipta klien dan mentakrifkan alat atau set alat. Untuk melaksanakan ini secara praktikal, kita boleh gunakan kod Python berikut. LLM akan dapat melihat set alat dan memutuskan sama ada menggunakan fungsi yang dicipta pengguna, `fetch_sales_data_using_sqlite_query`, atau Penterjemah Kod siap guna bergantung pada permintaan pengguna.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fungsi fetch_sales_data_using_sqlite_query yang boleh didapati dalam fail fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Inisialisasi set alat
toolset = ToolSet()

# Inisialisasi ejen panggilan fungsi dengan fungsi fetch_sales_data_using_sqlite_query dan menambahkannya ke set alat
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Inisialisasi alat Penafsir Kod dan menambahkannya ke set alat.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Apakah pertimbangan khas menggunakan Corak Reka Bentuk Penggunaan Alat untuk membina ejen AI yang boleh dipercayai?

Kebimbangan biasa dengan SQL yang dijana secara dinamik oleh LLM adalah keselamatan, khususnya risiko suntikan SQL atau tindakan berniat jahat, seperti memadam atau mengubah suai pangkalan data. Walaupun kebimbangan ini sah, ia boleh dikurangkan dengan berkesan dengan mengkonfigurasi kebenaran akses pangkalan data dengan betul. Untuk kebanyakan pangkalan data, ini melibatkan konfigurasi pangkalan data sebagai hanya baca. Untuk perkhidmatan pangkalan data seperti PostgreSQL atau Azure SQL, aplikasi harus diberikan peranan hanya baca (SELECT).

Menjalankan aplikasi dalam persekitaran yang selamat meningkatkan lagi perlindungan. Dalam senario perusahaan, data biasanya diekstrak dan ditukar dari sistem operasi ke dalam pangkalan data atau gudang data hanya baca dengan skema mesra pengguna. Pendekatan ini memastikan data selamat, dioptimumkan untuk prestasi dan kebolehcapaian, dan aplikasi mempunyai akses terhad dan hanya baca.

## Kod Sampel

- Python: [Rangka Kerja Ejen](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Rangka Kerja Ejen](./code_samples/04-dotnet-agent-framework.md)

## Ada Lebih Banyak Soalan tentang Corak Reka Bentuk Penggunaan Alat?

Sertai [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) untuk berjumpa dengan pelajar lain, menghadiri waktu pejabat dan dapatkan jawapan kepada soalan Ejen AI anda.

## Sumber Tambahan

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Bengkel Perkhidmatan Ejen Azure AI</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Bengkel Penulis Kreatif Contoso Multi-Ejen</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Gambaran Keseluruhan Microsoft Agent Framework</a>


## Ujian Asap Ejen Ini (Pilihan)

Selepas anda belajar untuk menyebarkan ejen dalam [Pelajaran 16](../16-deploying-scalable-agents/README.md), anda boleh melakukan ujian asap `TravelToolAgent` pelajaran ini (adakah ia masih memanggil alat dan menjawab?) dengan [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Lihat [`tests/README.md`](../tests/README.md) untuk cara menjalankannya.

## Pelajaran Sebelumnya

[Memahami Corak Reka Bentuk Agen](../03-agentic-design-patterns/README.md)

## Pelajaran Seterusnya

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->