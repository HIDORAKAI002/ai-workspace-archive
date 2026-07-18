# Meneroka Rangka Kerja Microsoft Agent

![Agent Framework](../../../translated_images/ms/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Pengenalan

Pelajaran ini akan merangkumi:

- Memahami Rangka Kerja Microsoft Agent: Ciri Utama dan Nilai  
- Meneroka Konsep Utama Rangka Kerja Microsoft Agent
- Corak MAF Lanjutan: Aliran Kerja, Middleware, dan Memori

## Matlamat Pembelajaran

Selepas melengkapkan pelajaran ini, anda akan tahu bagaimana untuk:

- Membina Ejen AI Sedia Produksi menggunakan Rangka Kerja Microsoft Agent
- Menerapkan ciri teras Rangka Kerja Microsoft Agent pada Kes Penggunaan Agensik anda
- Menggunakan corak lanjutan termasuk aliran kerja, middleware, dan kebolehlihatan

## Contoh Kod 

Contoh kod untuk [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) boleh didapati dalam repositori ini di bawah fail `xx-python-agent-framework` dan `xx-dotnet-agent-framework`.

## Memahami Rangka Kerja Microsoft Agent

![Framework Intro](../../../translated_images/ms/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) ialah rangka kerja seragam Microsoft untuk membina ejen AI. Ia menawarkan fleksibiliti untuk menangani pelbagai kes penggunaan agensik yang dilihat dalam persekitaran produksi dan penyelidikan termasuk:

- **Pengurusan Ejen Bersiri** dalam senario di mana aliran kerja langkah demi langkah diperlukan.
- **Pengurusan Secara Serentak** dalam senario di mana ejen perlu menyelesaikan tugas serentak.
- **Pengurusan Perbualan Kumpulan** dalam senario di mana ejen boleh bekerjasama pada satu tugas.
- **Pengurusan Serahan** dalam senario di mana ejen menyerahkan tugas kepada satu sama lain apabila subtugas selesai.
- **Pengurusan Magnetik** dalam senario di mana ejen pengurus mencipta dan mengubah senarai tugas serta mengendalikan penyelarasan subejen untuk menyelesaikan tugas.

Untuk menyampaikan Ejen AI dalam Produksi, MAF juga menyertakan ciri-ciri untuk:

- **Kebolehlihatan** melalui penggunaan OpenTelemetry di mana setiap tindakan Ejen AI termasuk panggilan alat, langkah pengurusan, aliran penalaran dan pemantauan prestasi melalui papan pemuka Microsoft Foundry.
- **Keselamatan** dengan mengehoskan ejen secara asli pada Microsoft Foundry yang merangkumi kawalan keselamatan seperti akses berasaskan peranan, pengendalian data peribadi dan keselamatan kandungan terbina dalam.
- **Daya Tahan** kerana benang dan aliran kerja ejen boleh berhenti, sambung semula dan pulih daripada ralat yang membolehkan proses berjalan lebih lama.
- **Kawalan** kerana aliran kerja manusia dalam kitaran disokong di mana tugas ditanda sebagai memerlukan kelulusan manusia.

Rangka Kerja Microsoft Agent juga memberi tumpuan kepada kesalinggunaan dengan:

- **Bersifat Awan-Negara** - Ejen boleh dijalankan dalam kontena, secara tempatan dan merentas pelbagai awan yang berlainan.
- **Bersifat Pembekal-Negara** - Ejen boleh dicipta melalui SDK pilihan anda termasuk Azure OpenAI dan OpenAI
- **Mengintegrasi Standard Terbuka** - Ejen boleh menggunakan protokol seperti Agent-to-Agent(A2A) dan Model Context Protocol (MCP) untuk mencari dan menggunakan ejen dan alat lain.
- **Pemalam dan Penyambung** - Sambungan boleh dibuat ke perkhidmatan data dan memori seperti Microsoft Fabric, SharePoint, Pinecone dan Qdrant.

Mari kita lihat bagaimana ciri-ciri ini digunakan pada beberapa konsep teras Rangka Kerja Microsoft Agent.

## Konsep Utama Rangka Kerja Microsoft Agent

### Ejen

![Agent Framework](../../../translated_images/ms/agent-components.410a06daf87b4fef.webp)

**Mencipta Ejen**

Penciptaan ejen dilakukan dengan menentukan perkhidmatan inferens (Penyedia LLM), 
set arahan untuk diikuti oleh Ejen AI, dan `name` yang diberikan:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Di atas menggunakan `Azure OpenAI` tetapi ejen boleh dicipta menggunakan pelbagai perkhidmatan termasuk `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

API OpenAI `Responses`, `ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

atau [MiniMax](https://platform.minimaxi.com/), yang menyediakan API yang serasi dengan OpenAI dengan tingkap konteks besar (sehingga 204K token):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

atau ejen jauh menggunakan protokol A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Menjalankan Ejen**

Ejen dijalankan menggunakan kaedah `.run` atau `.run_stream` untuk respons bukan aliran atau aliran.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Setiap larian ejen juga boleh mempunyai pilihan untuk mengubah suai parameter seperti `max_tokens` yang digunakan oleh ejen, `tools` yang boleh dipanggil oleh ejen, dan juga `model` yang digunakan untuk ejen itu.

Ini berguna dalam kes di mana model atau alat tertentu diperlukan untuk menyelesaikan tugas pengguna.

**Alat**

Alat boleh ditakrifkan sama ada semasa mentakrifkan ejen:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Apabila membuat ChatAgent secara langsung

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

dan juga semasa menjalankan ejen:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Alat disediakan untuk larian ini sahaja )
```

**Benang Ejen**

Benang Ejen digunakan untuk mengendalikan perbualan berbilang giliran. Benang boleh dicipta sama ada dengan:

- Menggunakan `get_new_thread()` yang membolehkan benang disimpan dari masa ke masa
- Mencipta benang secara automatik apabila menjalankan ejen dan benang hanya wujud semasa larian semasa.

Untuk mencipta benang, kod adalah seperti berikut:

```python
# Buat benang baru.
thread = agent.get_new_thread() # Jalankan agen dengan benang tersebut.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Anda kemudian boleh menyusun benang untuk disimpan guna kemudian:

```python
# Cipta benang baru.
thread = agent.get_new_thread() 

# Jalankan ejen dengan benang tersebut.

response = await agent.run("Hello, how are you?", thread=thread) 

# Serlahkan benang untuk penyimpanan.

serialized_thread = await thread.serialize() 

# Nyahserlahkan keadaan benang selepas memuatkan dari penyimpanan.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware Ejen**

Ejen berinteraksi dengan alat dan LLM untuk menyelesaikan tugas pengguna. Dalam senario tertentu, kita mahu melaksanakan atau menjejaki di antara interaksi ini. Middleware ejen membolehkan kita melakukan ini melalui:

*Middleware Fungsi*

Middleware ini membolehkan kita melaksanakan tindakan antara ejen dan fungsi/alat yang akan dipanggilnya. Contoh apabila ini digunakan ialah apabila anda mungkin ingin melakukan log pada panggilan fungsi.

Pada kod di bawah `next` mentakrifkan jika middleware seterusnya atau fungsi sebenar harus dipanggil.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Pra-pemprosesan: Log sebelum pelaksanaan fungsi
    print(f"[Function] Calling {context.function.name}")

    # Teruskan ke middleware atau pelaksanaan fungsi seterusnya
    await next(context)

    # Pasca-pemprosesan: Log selepas pelaksanaan fungsi
    print(f"[Function] {context.function.name} completed")
```

*Middleware Perbualan*

Middleware ini membolehkan kita melaksanakan atau merekod tindakan antara ejen dan permintaan antara LLM.

Ini mengandungi maklumat penting seperti `messages` yang dihantar kepada perkhidmatan AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Pra-pemprosesan: Log sebelum panggilan AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Teruskan ke middleware atau perkhidmatan AI seterusnya
    await next(context)

    # Pasca-pemprosesan: Log selepas respon AI
    print("[Chat] AI response received")

```

**Memori Ejen**

Seperti yang dibincangkan dalam pelajaran `Agentic Memory`, memori ialah elemen penting untuk membolehkan ejen beroperasi dalam konteks yang berbeza. MAF menawarkan beberapa jenis memori yang berbeza:

*Penyimpanan Dalam Memori*

Ini ialah memori yang disimpan dalam benang semasa runtime aplikasi.

```python
# Buat benang baru.
thread = agent.get_new_thread() # Jalankan ejen dengan benang tersebut.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Mesej Kekal*

Memori ini digunakan apabila menyimpan sejarah perbualan merentas sesi yang berbeza. Ia ditakrifkan menggunakan `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Buat penyimpanan mesej tersuai
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Memori Dinamik*

Memori ini ditambah ke konteks sebelum ejen dijalankan. Memori ini boleh disimpan dalam perkhidmatan luaran seperti mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Menggunakan Mem0 untuk keupayaan memori lanjutan
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**Kebolehlihatan Ejen**


Observabiliti adalah penting untuk membina sistem agen yang boleh dipercayai dan mudah diselenggara. MAF berintegrasi dengan OpenTelemetry untuk menyediakan penjejakan dan meter bagi observabiliti yang lebih baik.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # lakukan sesuatu
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Aliran Kerja

MAF menawarkan aliran kerja yang merupakan langkah yang telah ditetapkan untuk menyelesaikan sesuatu tugasan dan termasuk agen AI sebagai komponen dalam langkah-langkah tersebut.

Aliran kerja terdiri daripada komponen berbeza yang membolehkan kawalan aliran yang lebih baik. Aliran kerja juga membolehkan **orkestrasi pelbagai agen** dan **checkpointing** untuk menyimpan keadaan aliran kerja.

Komponen teras aliran kerja adalah:

**Pelaksana**

Pelaksana menerima mesej input, melaksanakan tugasan yang diberikan, dan kemudian menghasilkan mesej output. Ini memajukan aliran kerja ke arah menyelesaikan tugasan yang lebih besar. Pelaksana boleh menjadi agen AI atau logik khusus.

**Sisi**

Sisi digunakan untuk mentakrifkan aliran mesej dalam aliran kerja. Ini boleh menjadi:

*Sisi Langsung* - Sambungan satu-ke-satu yang mudah antara pelaksana:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Sisi Bersyarat* - Diaktifkan selepas syarat tertentu dipenuhi. Contohnya, apabila bilik hotel tidak tersedia, pelaksana boleh mencadangkan pilihan lain.

*Sisi Berpindah-kes* - Menghala mesej ke pelaksana berbeza berdasarkan syarat yang ditetapkan. Contohnya, jika pelanggan perjalanan mempunyai akses keutamaan dan tugasan mereka akan dikendalikan melalui aliran kerja lain.

*Sisi Pecah-keluar* - Menghantar satu mesej ke pelbagai sasaran.

*Sisi Kumpul-kemasukan* - Mengumpul pelbagai mesej dari pelaksana berbeza dan menghantar ke satu sasaran.

**Acara**

Untuk menyediakan observabiliti yang lebih baik ke dalam aliran kerja, MAF menawarkan acara terbina dalam untuk pelaksanaan termasuk:

- `WorkflowStartedEvent`  - Pelaksanaan aliran kerja bermula
- `WorkflowOutputEvent` - Aliran kerja menghasilkan output
- `WorkflowErrorEvent` - Aliran kerja mengalami ralat
- `ExecutorInvokeEvent`  - Pelaksana mula memproses
- `ExecutorCompleteEvent`  -  Pelaksana selesai memproses
- `RequestInfoEvent` - Permintaan dikeluarkan

## Corak MAF Lanjutan

Bahagian di atas meliputi konsep utama Microsoft Agent Framework. Ketika anda membina agen yang lebih kompleks, berikut adalah beberapa corak lanjutan untuk dipertimbangkan:

- **Komposisi Middleware**: Rantai beberapa pengendali middleware (log, pengesahan, kawalan kadar) menggunakan fungsi dan middleware sembang untuk kawalan terperinci ke atas tingkah laku agen.
- **Checkpointing Aliran Kerja**: Gunakan acara aliran kerja dan pensiri untuk menyimpan dan menyambung semula proses agen yang berjalan lama.
- **Pemilihan Alat Dinamik**: Gabungkan RAG ke atas deskripsi alat dengan pendaftaran alat MAF untuk hanya memaparkan alat yang berkaitan bagi setiap pertanyaan.
- **Penyerahan Multi-Agen**: Gunakan sisi aliran kerja dan penghalaan bersyarat untuk mengorkestrasi penyerahan antara agen khusus.

## Mengehoskan Agen LangChain / LangGraph di Microsoft Foundry

Microsoft Agent Framework adalah **kerangka kerjasama pelbagai rangka** — anda tidak terhad kepada agen yang ditulis dengan MAF. Jika anda sudah mempunyai agen yang dibina dengan **LangChain** atau **LangGraph**, anda boleh menjalankannya sebagai **agen yang dihoskan Microsoft Foundry** supaya Foundry menguruskan runtime, sesi, skala, identiti, dan titik akhir protokol untuk anda, sementara logik agen anda tetap dalam LangGraph.

Ini dilakukan dengan pakej `langchain_azure_ai.agents.hosting`, yang mendedahkan graf LangGraph yang ditaip semula melalui protokol yang sama yang digunakan oleh agen yang dihoskan Foundry.

**1. Pasang tambahan hosting:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

Tambahan `hosting` memasang perpustakaan protokol Foundry: `azure-ai-agentserver-responses` (titik akhir `/responses` yang serasi dengan OpenAI) dan `azure-ai-agentserver-invocations` (titik akhir `/invocations` umum).

**2. Pilih protokol hosting:**

| Protokol | Kelas Host | Titik Akhir | Digunakan apabila |
|----------|-----------|----------|----------|
| **Respon** | `ResponsesHostServer` | `/responses` | Anda mahukan sembang serasi OpenAI, penstriman, sejarah respons, dan penjejakan perbualan — lalai yang disyorkan untuk agen perbualan. |
| **Panggilan** | `InvocationsHostServer` | `/invocations` | Anda memerlukan bentuk JSON khusus, titik akhir gaya webhook, atau pemprosesan bukan perbualan. |

Oleh kerana **API Respon adalah API utama untuk pembangunan gaya agen dalam Foundry**, mulakan dengan `ResponsesHostServer` untuk kebanyakan agen.

**3. Konfigurasikan pemboleh ubah persekitaran** (`az login` dahulu supaya `DefaultAzureCredential` boleh mengesahkan):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Apabila agen dijalankan kemudian sebagai agen yang dihoskan di Foundry, platform secara automatik memasukkan `FOUNDRY_PROJECT_ENDPOINT`.

**4. Dedahkan agen LangGraph melalui protokol Respon:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # ChatOpenAI di sini menyasarkan titik akhir OpenAI-kompatibel (Respons) projek Foundry.
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

Jalankan secara tempatan dengan `python main.py`, kemudian hantar permintaan Respon ke `http://localhost:8088/responses`.

**Tingkah laku utama:**

- **Perbualan**: Pelanggan menyambung perbualan dengan menghantar `previous_response_id` atau ID `conversation`. Jika graf anda ditaip semula dengan penanda aras LangGraph, Foundry mengaitkan keadaan perbualan ke penanda aras (gunakan penanda aras ketahanan dalam pengeluaran; `MemorySaver` sesuai untuk ujian tempatan).
- **Manusia dalam gelung**: Jika graf anda menggunakan LangGraph `interrupt()`, `ResponsesHostServer` memaparkan gangguan yang belum selesai sebagai item `function_call` / `mcp_approval_request` dalam Respon, dan pelanggan menyambung dengan `function_call_output` / `mcp_approval_response` yang sepadan.
- **Lepaskan ke Foundry**: Gunakan Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (tempatan, memerlukan Docker), kemudian `azd provision` dan `azd deploy`. Pengedaran agen dihoskan memerlukan peranan **Pengurus Projek Foundry**.

Versi yang boleh dijalankan bagi contoh ini terdapat dalam [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Untuk panduan penuh (protokol Panggilan, skema permintaan khusus, dan penyelesaian masalah), lihat [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Contoh Kod

Contoh kod untuk Microsoft Agent Framework boleh didapati dalam repositori ini di bawah fail `xx-python-agent-framework` dan `xx-dotnet-agent-framework`.

## Ada Soalan Lanjut Mengenai Microsoft Agent Framework?

Sertai [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) untuk bertemu dengan pelajar lain, menghadiri waktu pejabat dan mendapatkan jawapan untuk soalan AI Agen anda.
## Pelajaran Sebelumnya

[Memori untuk AI Agen](../13-agent-memory/README.md)

## Pelajaran Seterusnya

[Membina Agen Penggunaan Komputer (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->