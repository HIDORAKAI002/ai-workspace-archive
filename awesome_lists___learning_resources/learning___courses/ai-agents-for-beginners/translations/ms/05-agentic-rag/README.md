[![Agentic RAG](../../../translated_images/ms/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Klik imej di atas untuk menonton video pelajaran ini)_

# Agentic RAG

Pelajaran ini menyediakan gambaran menyeluruh tentang Agentic Retrieval-Augmented Generation (Agentic RAG), satu paradigma AI yang sedang muncul di mana model bahasa besar (LLMs) merancang langkah seterusnya secara autonomi sambil mendapatkan maklumat daripada sumber luaran. Berbeza dengan corak ambil-kemudian-baca yang statik, Agentic RAG melibatkan panggilan iteratif kepada LLM, diselang-seli dengan panggilan alat atau fungsi dan output berstruktur. Sistem menilai hasil, memperhalusi pertanyaan, memanggil alat tambahan jika perlu, dan meneruskan kitaran ini sehingga penyelesaian yang memuaskan dicapai.

## Introduction

Pelajaran ini akan merangkumi

- **Understand Agentic RAG:**  Pelajari tentang paradigma AI yang muncul di mana model bahasa besar (LLMs) merancang langkah seterusnya secara autonomi sambil menarik maklumat dari sumber data luaran.
- **Grasp Iterative Maker-Checker Style:** Fahami gelung panggilan iteratif kepada LLM, diselang-seli dengan panggilan alat atau fungsi dan output berstruktur, yang direka untuk meningkatkan ketepatan dan mengendalikan pertanyaan yang cacat.
- **Explore Practical Applications:** Kenal pasti senario di mana Agentic RAG menonjol, seperti persekitaran yang mengutamakan ketepatan, interaksi pangkalan data yang kompleks, dan aliran kerja yang berpanjangan.

## Learning Goals

Selepas menamatkan pelajaran ini, anda akan tahu bagaimana/lebih memahami:

- **Understanding Agentic RAG:** Pelajari tentang paradigma AI yang muncul di mana model bahasa besar (LLMs) merancang langkah seterusnya secara autonomi sambil menarik maklumat dari sumber data luaran.
- **Iterative Maker-Checker Style:** Fahami konsep gelung panggilan iteratif kepada LLM, diselang-seli dengan panggilan alat atau fungsi dan output berstruktur, yang direka untuk meningkatkan ketepatan dan mengendalikan pertanyaan yang cacat.
- **Owning the Reasoning Process:** Fahami kemampuan sistem untuk menguasai proses penaakulan, membuat keputusan tentang bagaimana mendekati masalah tanpa bergantung pada laluan yang telah ditetapkan sebelumnya.
- **Workflow:** Fahami bagaimana model agentik membuat keputusan secara berdikari untuk mendapatkan laporan tren pasaran, mengenal pasti data pesaing, menghubungkan metrik jualan dalaman, mensintesis penemuan, dan menilai strategi.
- **Iterative Loops, Tool Integration, and Memory:** Pelajari tentang pergantungan sistem pada corak interaksi yang berulang, mengekalkan keadaan dan memori merentasi langkah untuk mengelakkan gelung berulang dan membuat keputusan yang lebih bermaklumat.
- **Handling Failure Modes and Self-Correction:** Terokai mekanisme pembetulan diri yang kukuh dalam sistem, termasuk iterasi dan pengambilan semula pertanyaan, menggunakan alat diagnostik, dan bergantung kepada pengawasan manusia apabila perlu.
- **Boundaries of Agency:** Fahami batasan Agentic RAG, dengan tumpuan kepada autonomi khusus domain, pergantungan infrastruktur, dan pematuhan kepada had keselamatan.
- **Practical Use Cases and Value:** Kenal pasti senario di mana Agentic RAG menonjol, seperti persekitaran yang mengutamakan ketepatan, interaksi pangkalan data yang kompleks, dan aliran kerja yang berpanjangan.
- **Governance, Transparency, and Trust:** Pelajari tentang kepentingan tadbir urus dan ketelusan, termasuk penaakulan yang boleh diterangkan, kawalan bias, dan pengawasan manusia.

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) adalah paradigma AI yang sedang muncul di mana model bahasa besar (LLMs) tidak hanya menarik maklumat dari sumber data luaran tetapi juga merancang langkah seterusnya secara autonomi. Berbeza daripada corak ambil-kemudian-baca yang statik atau urutan permintaan (prompt) yang ditulis rapi, Agentic RAG melibatkan gelung panggilan iteratif kepada LLM, diselang-seli dengan panggilan alat atau fungsi dan output berstruktur. Pada setiap giliran, sistem menilai hasil yang diperoleh, memutuskan sama ada untuk memperhalusi pertanyaannya, memanggil alat tambahan jika perlu, dan meneruskan kitaran ini sehingga mencapai penyelesaian yang memuaskan.

Gaya operasi iteratif “maker-checker” ini direka untuk meningkatkan ketepatan, mengendalikan pertanyaan yang cacat kepada pangkalan data berstruktur (contohnya NL2SQL), dan memastikan hasil yang seimbang dan berkualiti tinggi. Daripada bergantung semata-mata pada rantaian prompt yang direka secara teliti, sistem ini secara aktif menguasai proses penaakulan dirinya. Ia boleh menulis semula pertanyaan yang gagal, memilih kaedah pengambilan yang berbeza, dan menggabungkan pelbagai alat—seperti carian vektor dalam Azure AI Search, pangkalan data SQL, atau API tersuai—sebelum memuktamadkan jawapannya. Ini mengurangkan keperluan untuk rangka kerja orkestrasi yang terlalu kompleks. Sebaliknya, gelung yang agak mudah “panggilan LLM → guna alat → panggilan LLM → …” boleh menghasilkan output yang canggih dan berasas kukuh.

![Agentic RAG Core Loop](../../../translated_images/ms/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

Kualiti pembedaan yang menjadikan sistem itu “agentic” ialah kemampuannya untuk menguasai proses penaakulannya. Pelaksanaan RAG tradisional sering bergantung pada manusia untuk menentukan laluan model terlebih dahulu: rantaian pemikiran yang menggariskan apa yang perlu diambil dan bila. Tetapi apabila sistem benar-benar agentik, ia memutuskan secara dalaman bagaimana untuk mendekati masalah. Ia bukan sekadar melaksanakan skrip; ia menentukan secara autonomi urutan langkah berdasarkan kualiti maklumat yang ditemuinya.
Sebagai contoh, jika diminta untuk mencipta strategi pelancaran produk, ia tidak bergantung semata-mata pada prompt yang menerangkan keseluruhan aliran penyelidikan dan pembuatan keputusan. Sebaliknya, model agentik membuat keputusan secara berdikari untuk:

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3.	Correlate historical internal sales metrics using Azure SQL Database.
4.	Synthesize the findings into a cohesive strategy orchestrated via Azure OpenAI Service.
5.	Evaluate the strategy for gaps or inconsistencies, prompting another round of retrieval if necessary.
All of these steps—refining queries, choosing sources, iterating until “happy” with the answer—are decided by the model, not pre-scripted by a human.

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/ms/tool-integration.0f569710b5c17c10.webp)

Sistem agentik bergantung pada corak interaksi berlingkar:

- **Initial Call:** Matlamat pengguna (iaitu prompt pengguna) dibentangkan kepada LLM.
- **Tool Invocation:** Jika model mengenal pasti maklumat yang hilang atau arahan yang samar, ia memilih alat atau kaedah pengambilan—seperti pertanyaan pangkalan data vektor (contohnya carian hibrid Azure AI Search ke atas data peribadi) atau panggilan SQL berstruktur—untuk mengumpul lebih banyak konteks.
- **Assessment & Refinement:** Selepas menyemak data yang dikembalikan, model memutuskan sama ada maklumat itu mencukupi. Jika tidak, ia memperhalusi pertanyaan, mencuba alat berbeza, atau melaraskan pendekatannya.
- **Repeat Until Satisfied:** Kitaran ini diteruskan sehingga model menentukan bahawa ia mempunyai kejelasan dan bukti yang mencukupi untuk memberikan jawapan muktamad yang beralasan baik.
- **Memory & State:** Kerana sistem mengekalkan keadaan dan memori merentasi langkah, ia boleh mengingati percubaan sebelumnya dan hasilnya, mengelakkan gelung berulang dan membuat keputusan yang lebih bermaklumat ketika meneruskan.

Seiring masa, ini mewujudkan rasa kefahaman yang berkembang, membolehkan model menavigasi tugas bertingkat yang kompleks tanpa memerlukan campur tangan manusia yang kerap atau pembentukan semula prompt.

## Handling Failure Modes and Self-Correction

Autonomi Agentic RAG juga melibatkan mekanisme pembetulan diri yang kukuh. Apabila sistem menemui jalan buntu—seperti mengambil dokumen yang tidak relevan atau menghadapi pertanyaan yang cacat—ia boleh:

- **Iterate and Re-Query:** Daripada memberikan respons bernilai rendah, model mencuba strategi carian baru, menulis semula pertanyaan pangkalan data, atau melihat set data alternatif.
- **Use Diagnostic Tools:** Sistem mungkin memanggil fungsi tambahan yang direka untuk membantunya menyahpepijat langkah penaakulan atau mengesahkan ketepatan data yang diambil. Alat seperti Azure AI Tracing akan penting untuk membolehkan pemerhatian dan pemantauan yang kukuh.
- **Fallback on Human Oversight:** Untuk senario berisiko tinggi atau yang berulang kali gagal, model mungkin menandakan ketidakpastian dan meminta panduan manusia. Setelah manusia memberikan maklum balas pembetulan, model boleh menggabungkan pengajaran itu ke hadapan.

Pendekatan iteratif dan dinamik ini membolehkan model sentiasa memperbaiki diri, memastikan ia bukan sekadar sistem sekali sahaja tetapi satu yang belajar daripada kesilapan sepanjang sesi tertentu.

![Self Correction Mechanism](../../../translated_images/ms/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

Walaupun ia mempunyai autonomi dalam sesuatu tugas, Agentic RAG bukanlah setara dengan Kecerdasan Am Buatan. Keupayaan “agenik”nya terhad kepada alat, sumber data, dan dasar yang disediakan oleh pembangun manusia. Ia tidak boleh mencipta alat sendiri atau melangkaui sempadan domain yang telah ditetapkan. Sebaliknya, ia cemerlang dalam mengatur sumber yang ada secara dinamik.
Perbezaan utama daripada bentuk AI yang lebih maju termasuk:

1. **Domain-Specific Autonomy:** Sistem Agentic RAG tertumpu pada mencapai matlamat yang ditakrifkan pengguna dalam domain yang dikenali, menggunakan strategi seperti penulisan semula pertanyaan atau pemilihan alat untuk memperbaiki hasil.
2. **Infrastructure-Dependent:** Keupayaan sistem bergantung kepada alat dan data yang diintegrasikan oleh pembangun. Ia tidak boleh melampaui sempadan ini tanpa campur tangan manusia.
3. **Respect for Guardrails:** Garis panduan etika, peraturan pematuhan, dan polisi perniagaan kekal sangat penting. Kebebasan agen sentiasa dihadkan oleh langkah keselamatan dan mekanisme pengawasan (diharapkan?)

## Practical Use Cases and Value

Agentic RAG menonjol dalam senario yang memerlukan pemurnian iteratif dan ketelitian:

1. **Correctness-First Environments:** Dalam pemeriksaan pematuhan, analisis peraturan, atau penyelidikan undang-undang, model agentik boleh berulang kali mengesahkan fakta, merujuk pelbagai sumber, dan menulis semula pertanyaan sehingga ia menghasilkan jawapan yang disemak rapi.
2. **Complex Database Interactions:** Apabila berurusan dengan data berstruktur di mana pertanyaan sering kali gagal atau perlu disesuaikan, sistem boleh secara autonomi memperhalusi pertanyaannya menggunakan Azure SQL atau Microsoft Fabric OneLake, memastikan pengambilan akhir sejajar dengan niat pengguna.
3. **Extended Workflows:** Sesi yang berjalan lebih lama mungkin berkembang apabila maklumat baru muncul. Agentic RAG boleh terus memasukkan data baru, mengubah strategi apabila ia mempelajari lebih banyak tentang ruang masalah.

## Governance, Transparency, and Trust

Apabila sistem ini menjadi lebih autonomi dalam penaakulan mereka, tadbir urus dan ketelusan menjadi penting:

- **Explainable Reasoning:** Model boleh memberikan jejak audit tentang pertanyaan yang dibuat, sumber yang dirujuk, dan langkah penaakulan yang diambil untuk mencapai kesimpulan. Alat seperti Azure AI Content Safety dan Azure AI Tracing / GenAIOps boleh membantu mengekalkan ketelusan dan mengurangkan risiko.
- **Bias Control and Balanced Retrieval:** Pembangun boleh melaras strategi pengambilan untuk memastikan sumber data yang seimbang dan mewakili dipertimbangkan, dan secara berkala mengaudit output untuk mengesan bias atau corak yang condong menggunakan model tersuai untuk organisasi sains data maju yang menggunakan Azure Machine Learning.
- **Human Oversight and Compliance:** Untuk tugas sensitif, semakan manusia kekal penting. Agentic RAG tidak menggantikan pertimbangan manusia dalam keputusan berisiko tinggi—ia mengagumkannya dengan menyediakan pilihan yang disemak rapi.

Mempunyai alat yang menyediakan rekod tindakan yang jelas adalah penting. Tanpanya, menyahpepijat proses berbilang langkah boleh menjadi sangat sukar. Lihat contoh berikut dari Literal AI (syarikat di belakang Chainlit) untuk satu Agent run:

![AgentRunExample](../../../translated_images/ms/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

Agentic RAG mewakili evolusi semula jadi dalam cara sistem AI mengendalikan tugas yang kompleks dan intensif data. Dengan mengguna pakai corak interaksi berlingkar, memilih alat secara autonomi, dan memperhalusi pertanyaan sehingga mencapai hasil berkualiti tinggi, sistem ini bergerak melampaui pengikut arahan statik kepada pembuat keputusan yang lebih adaptif dan sedar konteks. Walaupun masih diikat oleh infrastruktur dan garis panduan etika yang ditetapkan manusia, keupayaan agentik ini membolehkan interaksi AI yang lebih kaya, lebih dinamik, dan akhirnya lebih berguna untuk perusahaan dan pengguna akhir.

### Got More Questions about Agentic RAG?

Sertai the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) untuk berjumpa dengan pelajar lain, menghadiri jam pejabat dan dapatkan soalan AI Agents anda dijawab.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Laksanakan Retrieval Augmented Generation (RAG) dengan Azure OpenAI Service: Pelajari cara menggunakan data anda sendiri dengan Azure OpenAI Service. Modul Microsoft Learn ini menyediakan panduan menyeluruh tentang pelaksanaan RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Penilaian aplikasi AI generatif dengan Microsoft Foundry: Artikel ini merangkumi penilaian dan perbandingan model pada set data yang tersedia secara awam, termasuk aplikasi Agentic AI dan seni bina RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Apakah Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Panduan Lengkap untuk Retrieval Augmented Generation Berasaskan Ejen – Berita dari generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: Tingkatkan RAG anda dengan pembentukan semula pertanyaan dan pertanyaan sendiri! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Menambah Lapisan Agentic kepada RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Masa Depan Pembantu Pengetahuan: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Cara Membina Sistem Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Menggunakan Microsoft Foundry Agent Service untuk menskala ejen AI anda</a>

### Kertas Akademik

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Pemurnian Iteratif dengan Maklum Balas Diri</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Ejen Bahasa dengan Pembelajaran Penguatan Verbal</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Model Bahasa Besar Boleh Memperbetulkan Diri dengan Kritikan Interaktif Bersama Alat</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Tinjauan mengenai Agentic RAG</a>

## Pelajaran Sebelumnya

[Corak Reka Bentuk Penggunaan Alat](../04-tool-use/README.md)

## Pelajaran Seterusnya

[Membina Ejen AI yang Boleh Dipercayai](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Penafian:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI Co-op Translator (https://github.com/Azure/co-op-translator). Walaupun kami berusaha sedaya upaya untuk ketepatan, sila ambil perhatian bahawa terjemahan automatik mungkin mengandungi ralat atau ketidakakuratan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber rujukan yang muktamad. Untuk maklumat yang kritikal, disarankan mendapatkan terjemahan profesional oleh penterjemah manusia. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsiran yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->