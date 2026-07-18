# Değişiklik Günlüğü

**Yeni Başlayanlar için AI Ajanları** kursundaki tüm kayda değer değişiklikler bu dosyada belgelenmiştir.

## [Yayınlandı] — 2026-07-13

Bu sürüm, konuşlandırma döngüsünü tamamlayan iki yeni ders ekler — ajanları Microsoft Foundry'ye ölçeklendirme ve tek bir iş istasyonuna indirgeme — ayrıca bir duman testi hattı, yenilenmiş kurs navigasyonu, yeni öğrenen becerileri ve güncellenmiş markalaşma içerir.

### Eklendi

- **Ders 16 — Microsoft Foundry ile Ölçeklenebilir Ajanların Dağıtımı.** Üretim müşteri destek ajanı (araçlar, RAG, bellek, model yönlendirme, yanıt önbellekleme, insan onayı, bir değerlendirme kapısı ve OpenTelemetry izleme) oluşturan yeni ders [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) ve çalıştırılabilir not defteri [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb), geliştirme/dağıtım/çalışma zamanı Mermaid diyagramları, bir bilgi kontrolü, bir ödev ve bir zorluk ile.
- **Ders 17 — Foundry Local ve Qwen ile Yerel AI Ajanları Yaratma.** Tamamen cihaz üzerinde mühendislik asistanı (Qwen işlev çağrısı Foundry Local aracılığıyla, sanal alan araçları, yerel RAG Chroma ile, isteğe bağlı yerel MCP) oluşturan yeni ders [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) ve not defteri [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb), yalnızca yerel / yerel-RAG / araç çağrısı diyagramları, bir bilgi kontrolü, bir ödev ve bir zorluk ile.
- **Duman testi hattı.** Yeni [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) iş akışı [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) ve Dersler 01, 04, 05 ve 16'daki dağıtılabilir ajanlar için [tests/](./tests/README.md) altında ders başına kataloglar, her katalog ile ilgili ders ve barındırılan ajan adına eşleştiren bir indeks README. Ders 16, "Duyan Ajanı Duman Testleriyle Doğrulama" bölümünü kazanır; Dersler 01/04/05 isteğe bağlı bir duman testi işaretçisi ekler.
- **Öğrenen beceriler.** `.agents/skills/` altında yeni Ajan Becerileri: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (Ders 16 ve 17 yönergelerini paketler) ve [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (Microsoft Foundry / Azure OpenAI kurulumuna karşı not defteri örneklerini nasıl doğrulayacağınıza dair).
- **Not defteri doğrulama çalıştırıcısı.** Her Python not defterini `nbconvert` ile başlıksız çalışan ve bir GEÇTİ/KALDI matrisi (artı `results.json`) yazdıran yeni [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1). Depo kökünü ve Python'u otomatik algılar, varsayılan olarak kurs dışı not defterlerini (`.venv`, `site-packages`, `translations`, beceri şablonu varlıkları) ve `.NET` not defterlerini dışlar ve `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet` ve `-Python` destekler.
- **Kurs navigasyonu.** Dersler 11–15'e Önceki/Sonraki ders bağlantıları eklendi (önceden eksikti) böylece tüm kurs 00 → 18 arasında her iki yönde zincirlenmiş oldu.
- **Yeni küçük resimler.** Ders 16 ve 17 için ders küçük resimleri ve güncellenmiş depo sosyal resmi [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (artık iki yeni dersi ve `aka.ms/ai-agents-beginners` URL'sini tanıtıyor).
- **Bağımlılıklar** ([requirements.txt](../../requirements.txt)): Ders 17 için `foundry-local-sdk` ve `chromadb` eklendi.

### Değiştirildi

- **Ana [README.md](./README.md)** ders tablosu: Ders 16 ve 17 artık içeriklerine bağlantı veriyor (önceden "Yakında"); depo resmi `repo-thumbnailv3.png` olarak güncellendi.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: Derslere göre rehbere ve öğrenme yollarına Ders 16 ve 17 eklendi ve "Dağıtılan Ajanların Duman Testleriyle Doğrulanması" bölümü eklendi.
- **[AGENTS.md](./AGENTS.md)**: ders sayısı/açıklaması (00–18) güncellendi, duman testi doğrulama bölümü ve Ders 16/17 örnek adlandırma örnekleri eklendi.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "Önceki Ders" artık Ders 17'ye (önceden Ders 15) yönlendiriyor, zinciri tamamlıyor.
- **Kullanımdan kaldırılmamış modellerde standartlaştırılmış model referansları.** Kurstaki tüm `gpt-4o` / `gpt-4o-mini` referansları (`docs`, `.env.example`, Python/.NET not defterleri ve örnekler) `gpt-4.1-mini` ile değiştirildi — `gpt-4o` (tüm sürümler) 2026'da kullanımdan kaldırılıyor. Ders 16'nın model yönlendirme örneği küçük/büyük karşıtlığı `gpt-4.1-mini` (küçük) ve `gpt-4.1` (büyük) kullanarak sürdürür. Python not defterleri artık model adını sert kodlamak yerine ortam değişkenlerinden (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) seçer.

### Notlar ve bilinen sınırlamalar

- **Canlı Azure üzerinde çalıştırılmadı.** Yeni derslerin not defterleri eğitim amaçlı örneklerdir; bunları kendi Microsoft Foundry / Foundry Local kurulumunuzda çalıştırıp doğrulayın. Duman testi iş akışı, ders ajanını dağıtmanızı ve Azure OIDC sırlarını (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) Foundry proje kapsamında **Azure AI Kullanıcısı** rolü ile yapılandırmanızı gerektirir.
- **Ders 17 yalnızca yerel.** Foundry Yanıtları uç noktası yoktur, bu nedenle duman testi işlemi uygulanmaz; doğrulamak için not defterini iş istasyonunuzda çalıştırın.

## [Yayınlandı] — 2026-07-06

Bu sürüm, kursu **Azure OpenAI Responses API**'ye taşır, ürün adlandırmasını **Microsoft Foundry** ve **Microsoft Agent Framework (MAF)** olarak standartlaştırır, GitHub Modellerini kullanımdan kaldırır, SDK sürümlerini günceller ve yerel modeller ile diğer çerçevelerin Foundry'de barındırılması üzerine yeni içerik ekler.

### Eklendi

- **Geçiş becerisi** — `.agents/skills/` altında kurulu [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Ajan Becerisi (Azure-Samples/azure-openai-to-responses'dan) dahil tüm referansları ve tarayıcı betiği ile.
- **Foundry Local (modelleri cihazda çalıştırma)** — [00-course-setup/README.md](./00-course-setup/README.md) içinde yeni "Alternatif Sağlayıcı: Foundry Local" bölümü; kurulum (`winget` / `brew`), `foundry model run`, `foundry-local-sdk` ve `FoundryLocalManager`'ın Microsoft Agent Framework'e `OpenAIChatClient` ile bağlanması hakkında.
- **Microsoft Foundry'de LangChain / LangGraph ajanlarını barındırma** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) içinde yeni bölüm ve `langchain-azure-ai[hosting]` ile `/responses` protokolünü kullanan çalıştırılabilir örnek [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py), [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) esaslı.
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) içinde yeni "Gerçek Dünya Örneği: Microsoft Project Opal" bölümü; Opal'ı bir kurumsal bilgisayar kullanımı ajanı olarak konumluyor ve kurs kavramlarına (insan döngüsü, güvenlik, planlama, Beceriler) eşliyor.
- **İkinci Ders 02 Python örneği** — Eski Semantic Kernel not defterinden taşınan [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) eklendi ve ders README'sine bağlandı (bkz. "Değiştirildi").
- [STUDY_GUIDE.md](./STUDY_GUIDE.md) içine "Modeller ve Sağlayıcılar" bölümü eklendi.

### Değiştirildi

- **Chat Completions → Responses API (Python).** Modele doğrudan çağrı yapan örnekler Chat Completions'tan Responses API'ye geçiş yaptı (`client.responses.create(input=..., store=False)`, `resp.output_text`), stabil Azure OpenAI `/openai/v1/` uç noktasına karşı `OpenAI` istemcisi kullanılarak (api_version yok). Etkilenen örnekler:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — tam işlev çağrısı anlatımı (araç şeması Responses formatına düzleştirildi, araç sonuçları `function_call_output`, `max_output_tokens` vb. olarak döndü).
- **GitHub Modelleri → Azure OpenAI.** GitHub Modelleri kullanımdan kaldırıldı (Temmuz 2026'da emekli olacak) ve Responses API desteklemiyor. Tüm GitHub Modelleri kod yolları Python ve .NET örneklerinde Azure OpenAI / Microsoft Foundry'ye dönüştürüldü:
  - Python: Ders 08 iş akışı not defterleri (`01`–`03`), Ders 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + eşlik eden `.md` dokümanlar, ve Ders 08 dotNET iş akışı not defterleri/`.md` (`01`–`03`) artık `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` ile `AzureCliCredential` kullanıyor.
- **Semantic Kernel → Microsoft Agent Framework.** Önceki `02-semantic-kernel.ipynb` Microsoft Agent Framework (+Azure OpenAI Responses API) kullanacak şekilde yeniden yazıldı ve adı `02-python-agent-framework-azure-openai.ipynb` olarak değiştirildi.
- **`FoundryChatClient` + `as_agent` standartlaştırıldı.** `AzureAIProjectAgentProvider`'a referans veren README ve not defteri kodu, Ders 01 ve çerçevenin kendi örneklerinde kullanılan standart kalıp olan `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` ve `provider.as_agent(...)` kullanacak şekilde güncellendi. Ders 02–14 README'leri ve not defterlerinde (ör. Ders 13 bellek, tüm Ders 14 not defterleri, `11-agentic-protocols/code_samples/github-mcp/app.py`) uygulandı.
- **Ürün isimlendirmesi.** İngilizce içerikte şunlar yeniden adlandırıldı:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Değişmedi: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" ve ortam değişkeni isimleri.)
- **Bağımlılıklar** ([requirements.txt](../../requirements.txt)):
  - `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0` sabitlendi.
  - `openai>=1.108.1` (Responses API için minimum) sabitlendi.
  - `azure-ai-inference` kaldırıldı (sadece taşınan GitHub Modeller örnekleri kullanıyordu).
- **Ortam yapılandırması** ([.env.example](../../.env.example)): GitHub Modelleri değişkenleri (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) kaldırıldı; `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` ve isteğe bağlı `AZURE_OPENAI_API_KEY` eklendi; Microsoft Foundry isimlendirmesine güncellendi.
- **Dokümantasyon** — Yukarıdakiler için [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md) ve [STUDY_GUIDE.md](./STUDY_GUIDE.md) güncellendi (env değişkenleri kurulumu, doğrulama kodu, sağlayıcı rehberi, isimlendirme).

### Kaldırıldı

- GitHub Modelleri kurulum adımları ve ortam değişkenleri, kurulum dokümanlarından kaldırıldı (yerini Azure OpenAI / Microsoft Foundry aldı).

### Güvenlik / Gizlilik (kamu paylaşımı temizliği)

- Gerçek **Azure abonelik kimliği**, kaynak grubu/kaynağın isimleri ve Bing bağlantı kimliği sızdıran, ayrıca geliştirici **yerel dosya yolları ve kullanıcı adları** içeren Jupyter not defteri çalışma çıktıları temizlendi:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Takip edilen İngilizce içerikte API anahtarları, tokenlar, abonelik kimlikleri veya kişisel yolların kalmadığı doğrulandı (kalan `GITHUB_TOKEN` referansları, iş akışlarındaki GitHub Actions tokenı ve Lesson 11 kurulumundaki GitHub MCP sunucu PAT'sidir — her ikisi de yasal ve GitHub Modelleri ile ilgisizdir).

### Notlar ve bilinen sınırlamalar

- **Çalıştırılmadı/derlenmedi.** Bunlar API/isimlendirme doğruluğu için güncellenmiş eğitim amaçlı örneklerdir; canlı Azure kaynaklarına karşı çalıştırılmadılar ve .NET örnekleri bu ortamda derlenmedi. Kendi Microsoft Foundry / Azure OpenAI dağıtımınızda doğrulayın.
- **Model dağıtımı Responses API'yi desteklemelidir.** `gpt-4.1-mini`, `gpt-4.1` veya `gpt-5.x` modellerinden biri gibi bir dağıtım kullanın. Eski modeller çekirdek Responses işlevselliğini destekler ancak her özelliği değil.
- **Agent-framework sürümü.** Örnekler en son MAF (`>=1.10.0`) hedeflenmiştir. Kanonik ajan oluşturma çağrısı `client.as_agent(...)`; API'ler çerçevenin yayınlanan belgeleri ve kurulu sürümü karşısında doğrulandı. Farklı bir sürüm kullanıyorsanız, yöntem bulunabilirliğini ( `as_agent` vs `create_agent`) doğrulayın.
- **Lesson 08 iş akışı not defteri 04** bilinçli olarak `AzureAIAgentClient` ( `agent-framework-azure-ai`'den) tutar çünkü Microsoft Foundry Agent Service barındırılan araçları (Bing dayanak, kod yorumlayıcı) kullanır; zaten Responses tabanlıdır.
- **.NET varsayılan dağıtımı.** Daha önceki iki Lesson 08 dotNET iş akışı örneği belirli bir modeli sert kodlamıştı; şimdi varsayılan olarak `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) kullanılır. Bir örnek multimodal/görsel girişe güveniyorsa, `AZURE_OPENAI_DEPLOYMENT` uygun bir modele ayarlayın.
- **Foundry Local,** OpenAI uyumlu bir **Chat Completions** uç noktası sağlar ve yerel geliştirme amaçlıdır; tam Responses API özellik seti için Azure OpenAI / Microsoft Foundry kullanın.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->