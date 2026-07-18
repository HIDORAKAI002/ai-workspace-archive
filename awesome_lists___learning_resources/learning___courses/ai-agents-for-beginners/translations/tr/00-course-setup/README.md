# Kurs Kurulumu

## Giriş

Bu derste, bu kursun kod örneklerini nasıl çalıştıracağınız ele alınacaktır.

## Diğer Öğrenenlere Katılın ve Yardım Alın

Repo'yu klonlamaya başlamadan önce, kurulum ile ilgili herhangi bir yardım almak, kursla ilgili sorularınızı sormak ya da diğer öğrenenlerle bağlantı kurmak için [AI Agents For Beginners Discord kanalına](https://aka.ms/ai-agents/discord) katılın.

## Bu Repoyu Klonlayın veya Forklayın

Başlamak için, lütfen GitHub deposunu klonlayın veya fork yapın. Bu, kodu çalıştırmak, test etmek ve ayarlamak için kurs materyalinin kendi versiyonunuzu oluşturmanızı sağlar!

Bunu <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">reponun forkunu oluşturmak için</a> linkine tıklayarak yapabilirsiniz.

Şu anda bu kursun kendi forklanmış versiyonuna aşağıdaki linkte sahip olmalısınız:

![Forklanmış Repo](../../../translated_images/tr/forked-repo.33f27ca1901baa6a.webp)

### Yüzeysel Klonlama (workshop / Codespaces için önerilir)

  > Tam depo, tam geçmiş ve tüm dosyalar indirildiğinde büyük olabilir (~3 GB). Sadece workshop'a katılıyorsanız veya sadece birkaç ders klasörüne ihtiyacınız varsa, yüzeysel klonlama (veya seyrek klonlama) geçmişin kısaltılması ve/veya blobların atlanmasıyla bu indirmenin çoğunu engeller.

#### Hızlı Yüzeysel Klon — minimal geçmiş, tüm dosyalar

Aşağıdaki komutlarda `<your-username>` yerini fork URL'nizle (veya tercihiniz upstream URL ile) değiştirin.

Sadece en son commit geçmişini klonlamak için (küçük indirme):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Belirli bir dalı klonlamak için:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Kısmi (seyrek) klon — minimal bloblar + sadece seçilen klasörler

Bu, kısmi klon ve seyrek-checkout kullanır (Git 2.25+ gerektirir ve kısmi klon desteği olan modern Git önerilir):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Repoya girin:

```bash|powershell
cd ai-agents-for-beginners
```

Sonra hangi klasörleri istediğinizi belirtin (aşağıdaki örnek iki klasörü gösterir):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Klonladıktan ve dosyaları doğruladıktan sonra, sadece dosyalara ihtiyacınız varsa ve alan boşaltmak istiyorsanız (git geçmişi yok), lütfen depo meta verisini silin (💀geri alınamaz — tüm Git fonksiyonları kaybolur: commitler, pull, push veya geçmiş erişimi olmaz).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces Kullanımı (yerel büyük indirmeleri önlemek için önerilir)

- Bu repo için [GitHub UI](https://github.com/codespaces) üzerinden yeni bir Codespace oluşturun.  

- Oluşturulan codespace terminalinde, sadece ihtiyacınız olan ders klasörlerini codespace çalışma alanına getirmek için yukarıdaki yüzeysel/seyrek klon komutlarından birini çalıştırın.
- İsteğe bağlı: Codespaces içinde klonladıktan sonra, ekstra alan kazanmak için .git klasörünü kaldırın (yukarıdaki silme komutlarına bakın).
- Not: Repoyu doğrudan Codespaces içinde açmayı tercih ederseniz (ekstra klon olmadan), Codespaces devcontainer ortamını oluşturacak ve yine de ihtiyacınızdan fazlasını sağlayabilir. Yeni bir Codespace içinde yüzeysel kopya klonlamak disk kullanımı üzerinde daha fazla kontrol sağlar.

#### İpuçları

- Düzenleme/commit yapmak istiyorsanız clone URL'sini mutlaka forkunuzla değiştirin.
- İleride daha fazla geçmiş veya dosya ihtiyacınız olursa, bunları fetch edebilir veya seyrek-checkout'u ek klasörler dahil edecek şekilde ayarlayabilirsiniz.

## Kodu Çalıştırma

Bu kurs, AI Ajanları oluşturma deneyimi kazanmak için çalıştırabileceğiniz bir dizi Jupyter Notebooks sunar.

Kod örnekleri, **Microsoft Agent Framework (MAF)**'i ve `FoundryChatClient`'ı kullanır; bu da **Microsoft Foundry Agent Service V2** (Yanıt API'si) üzerinden **Microsoft Foundry** ile bağlantı kurar.

Tüm Python not defterleri `*-python-agent-framework.ipynb` olarak etiketlenmiştir.

## Gereksinimler

- Python 3.12+
  - **NOT:** Eğer Python3.12 yüklü değilse, yüklediğinizden emin olun. Ardından, requirements.txt dosyasından doğru sürümlerin yüklendiğinden emin olmak için python3.12 ile venv oluşturun.
  
    >Örnek

    Python venv dizini oluşturun:

    ```bash|powershell
    python -m venv venv
    ```

    Sonra venv ortamını etkinleştirin:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET kullanılan örnek kodlar için, [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) veya daha yenisini yüklediğinizden emin olun. Ardından kurulu .NET SDK sürümünüzü kontrol edin:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Kimlik doğrulama için gereklidir. [aka.ms/installazurecli](https://aka.ms/installazurecli) üzerinden yükleyin.
- **Azure Aboneliği** — Microsoft Foundry ve Microsoft Foundry Agent Service erişimi için.
- **Microsoft Foundry Projesi** — Yayına alınmış bir model içeren proje (örneğin, `gpt-4.1-mini`). Aşağıdaki [Adım 1](#adım-1-microsoft-foundry-projesi-oluşturun) bölümüne bakın.

Kod örneklerini çalıştırmak için gerekli tüm Python paketlerini içeren bir `requirements.txt` dosyasını bu deponun köküne dahil ettik.

Bunları yüklemek için terminalinizde, deponun kökünde aşağıdaki komutu çalıştırabilirsiniz:

```bash|powershell
pip install -r requirements.txt
```

Herhangi bir çakışma ve sorun yaşamamak için bir Python sanal ortamı oluşturmanızı öneririz.

## VSCode Kurulumu

VSCode'da doğru Python sürümünü kullandığınızdan emin olun.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry ve Microsoft Foundry Agent Service Kurulumu

### Adım 1: Microsoft Foundry Projesi Oluşturun

Not defterlerini çalıştırmak için dağıtılmış model içeren bir Microsoft Foundry **hub** ve **projesi** gereklidir.

1. [ai.azure.com](https://ai.azure.com) sitesine gidin ve Azure hesabınızla oturum açın.
2. Bir **hub** oluşturun (ya da mevcut birini kullanın). Bakınız: [Hub kaynakları genel bakış](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Hub içinde bir **proje** oluşturun.
4. **Models + Endpoints** → **Model dağıtımı** üzerinden bir model dağıtın (örneğin `gpt-4.1-mini`).

### Adım 2: Proje Uç Noktası ve Model Dağıtım Adını Alın

Microsoft Foundry portalında projenizden:

- **Proje Uç Noktası** — **Overview** (Genel Bakış) sayfasına gidin ve uç nokta URL'sini kopyalayın.

![Proje Bağlantı Dizisi](../../../translated_images/tr/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Dağıtım Adı** — **Models + Endpoints** altında, dağıttığınız modeli seçin ve **Deployment name** (Dağıtım adı, örn. `gpt-4.1-mini`) not edin.

### Adım 3: `az login` ile Azure’a Giriş Yapın

Tüm not defterleri, kimlik doğrulama için **`AzureCliCredential`** kullanır — yönetilmesi gereken API anahtarları yoktur. Bu, Azure CLI ile oturum açmanızı gerektirir.

1. **Azure CLI'yı yükleyin** (eğer henüz yüklemediyseniz): [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. Aşağıdaki komutu çalıştırarak **oturum açın**:

    ```bash|powershell
    az login
    ```

    Veya eğer uzak/Codespace ortamındaysanız ve tarayıcınız yoksa:

    ```bash|powershell
    az login --use-device-code
    ```

3. İstendiğinde, Foundry projenizi içeren **aboneliği seçin**.

4. Oturum açtığınızı **doğrulayın**:

    ```bash|powershell
    az account show
    ```

> **Neden `az login`?** Not defterleri, kimlik doğrulama için `azure-identity` paketinden `AzureCliCredential` kullanır. Bu, Azure CLI oturumunuzun kimlik bilgilerini sağladığı anlamına gelir — API anahtarları veya gizli bilgiler `.env` dosyanızda olmaz. Bu bir [güvenlik en iyi uygulamasıdır](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Adım 4: `.env` Dosyanızı Oluşturun

Örnek dosyayı kopyalayın:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

`.env` dosyasını açın ve aşağıdaki iki değeri doldurun:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Değişken | Nereden bulunur |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portal → projeniz → **Overview** sayfası |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portal → **Models + Endpoints** → dağıtılmış modelin adı |

Çoğu ders için bu kadar! Not defterleri `az login` oturumunuz aracılığıyla otomatik olarak kimlik doğrulaması yapacaktır.

### Adım 5: Python Bağımlılıklarını Yükleyin

```bash|powershell
pip install -r requirements.txt
```

Bunu daha önce oluşturduğunuz sanal ortam içinde çalıştırmanızı öneririz.

## Ders 5 (Agentic RAG) için Ek Kurulum

Ders 5, retrieval-augmented generation için **Azure AI Search** kullanır. O dersleri çalıştırmayı planlıyorsanız, `.env` dosyanıza şu değişkenleri ekleyin:

| Değişken | Nereden bulunur |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portal → **Azure AI Search** kaynağınız → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portal → **Azure AI Search** kaynağınız → **Settings** → **Keys** → birincil yönetici anahtarı |

## Azure OpenAI'yı Doğrudan Çağıran Dersler için Ek Kurulum (6 ve 8. Dersler)

Ders 6 ve 8'deki bazı not defterleri, Microsoft Foundry projesi yerine doğrudan **Azure OpenAI**'yı ( **Responses API** kullanarak) çağırır. Bu örnekler önceden Github Modellerini kullanıyordu, ancak bu model Temmuz 2026'da emekliye ayrılacak ve Responses API desteklemiyor. Bu örnekleri çalıştırmayı planlıyorsanız, `.env` dosyanıza şu değişkenleri ekleyin:

| Değişken | Nereden bulunur |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure portal → **Azure OpenAI** kaynağınız → **Keys and Endpoint** → Uç Nokta (örneğin `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Responses API'yı destekleyen dağıttığınız modelin adı (örneğin `gpt-4.1-mini`) |
| `AZURE_OPENAI_API_KEY` | İsteğe bağlı — sadece anahtar tabanlı kimlik doğrulama kullanıyorsanız (az login / Entra ID yerine) |

> Responses API kararlı `/openai/v1/` uç noktasını kullanır, bu yüzden `api-version` gerekmez. Anahtarsız Entra ID kimlik doğrulaması için `az login` ile giriş yapın.

## Alternatif Sağlayıcı: MiniMax (OpenAI-Uyumlu)

[MiniMax](https://platform.minimaxi.com/) büyük bağlam modellerini (204K tokene kadar) OpenAI-uyumlu API üzerinden sağlar. Microsoft Agent Framework'ün `OpenAIChatClient` her OpenAI-uyumlu uç noktayla çalıştığı için, MiniMax'ı Azure OpenAI veya OpenAI yerine doğrudan kullanabilirsiniz.

`.env` dosyanıza şu değişkenleri ekleyin:

| Değişken | Nereden bulunur |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platformu](https://platform.minimaxi.com/) → API Anahtarları |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` (varsayılan değer) olarak kullanın |
| `MINIMAX_MODEL_ID` | Kullanılacak model adı (örn., `MiniMax-M3`) |

**Örnek modeller**: `MiniMax-M3` (önerilir), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (daha hızlı yanıtlar). Model isimleri ve kullanılabilirlik zamanla değişebilir, belirli bir modele erişim hesabınıza veya bölgenize bağlı olabilir — geçerli liste için [MiniMax Platformu](https://platform.minimaxi.com/) kontrol edin. Eğer `MiniMax-M3` hesabınızda yoksa, erişiminiz olan bir modeli `MINIMAX_MODEL_ID` olarak ayarlayın (örn. `MiniMax-M2.7`).

`OpenAIChatClient` kullanan kod örnekleri (örneğin, 14. Ders otel rezervasyon iş akışı) `MINIMAX_API_KEY` ayarlandığında otomatik olarak MiniMax yapılandırmanızı algılayacak ve kullanacaktır.

## Alternatif Sağlayıcı: Foundry Local (Modelleri Cihazda Çalıştırın)

[Foundry Local](https://foundrylocal.ai), OpenAI-uyumlu API aracılığıyla dil modellerini **tamamen kendi makinenizde** indirip yöneten ve sunan hafif bir çalışma zamanı ortamıdır — bulut, Azure aboneliği ve API anahtarı gerektirmez. Çevrimdışı geliştirme, bulut maliyetleri olmadan denemeler yapma veya verileri cihazınızda tutmak için mükemmel bir seçenektir.

Microsoft Agent Framework'ün `OpenAIChatClient` herhangi bir OpenAI-uyumlu uç noktayla çalıştığı için, Foundry Local Azure OpenAI'ya yerel bir alternatif olarak kullanılabilir.

**1. Foundry Local'ı Yükleyin**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Bir modeli indirin ve çalıştırın** (bu aynı zamanda yerel servisi başlatır):

```bash
foundry model list          # mevcut modelleri göründürüyoruz
foundry model run phi-4-mini
```

**3. Yerel uç noktayı keşfetmek için kullanılan Python SDK'sını yükleyin:**

```bash
pip install foundry-local-sdk
```

**4. Microsoft Agent Framework'ü yerel modelinize yönlendirin:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Modeli yerel olarak indirir (gerekirse) ve sunar, sonra uç noktayı/portu keşfeder.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # örn. http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Local için her zaman "gerekmiyor"
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Not:** Foundry Local OpenAI-uyumlu **Chat Completions** uç noktası sağlar. Yerel geliştirme ve çevrimdışı senaryolar için kullanın. Tam **Responses API** özellik seti (durumlu konuşmalar, derin araç orkestrasyonu ve ajan tarzı geliştirme) için **Azure OpenAI** veya bir **Microsoft Foundry** projesi hedefleyin. Güncel model kataloğu ve platform desteği için [Foundry Local dökümantasyonuna](https://foundrylocal.ai) bakın.


## Ders 8 için Ek Kurulum (Bing Grounding İş Akışı)

Ders 8’deki koşullu iş akışı not defteri, Microsoft Foundry üzerinden **Bing grounding** kullanır. Bu örneği çalıştırmayı planlıyorsanız, `.env` dosyanıza bu değişkeni ekleyin:

| Değişken | Nereden Bulunur |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry portalı → projeniz → **Yönetim** → **Bağlı kaynaklar** → Bing bağlantınız → bağlantı kimliğini kopyalayın |

## Sorun Giderme

### macOS'de SSL Sertifika Doğrulama Hataları

Eğer macOS kullanıyorsanız ve aşağıdaki gibi bir hata alıyorsanız:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Bu, macOS’de Python’da sistem SSL sertifikalarının otomatik olarak güvenilmemesiyle ilgili bilinen bir sorundur. Aşağıdaki çözümleri sırayla deneyin:

**Seçenek 1: Python’un Sertifika Yükleme betiğini çalıştırın (önerilir)**

```bash
# Yüklü Python sürümünüzü 3.XX ile değiştirin (ör. 3.12 veya 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Seçenek 2: Not defterinizde `connection_verify=False` kullanın (sadece GitHub Modelleri not defterleri için)**

Ders 6 not defterinde (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) zaten yorum satırı haline getirilmiş bir geçici çözüm bulunmakta. İstemciyi oluştururken `connection_verify=False` satırının yorumunu kaldırın:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Sertifika hatalarıyla karşılaşırsanız SSL doğrulamasını devre dışı bırakın
)
```

> **⚠️ Uyarı:** SSL doğrulamasını devre dışı bırakmak (`connection_verify=False`), sertifika doğrulamasını atladığı için güvenliği azaltır. Bunu yalnızca geliştirme ortamlarında, geçici bir çözüm olarak kullanın; üretimde asla kullanmayın.

**Seçenek 3: `truststore` kurun ve kullanın**

```bash
pip install truststore
```

Ardından, ağ çağrısı yapmadan önce not defterinizin veya betiğinizin başına aşağıdakini ekleyin:

```python
import truststore
truststore.inject_into_ssl()
```

## Takıldınız mı?

Bu kurulumu çalıştırırken herhangi bir sorun yaşarsanız, <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Topluluğu Discord</a> kanalımıza katılabilir veya <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">bir sorun oluşturabilirsiniz</a>.

## Sonraki Ders

Artık bu kurs için kodu çalıştırmaya hazırsınız. Yapay Zeka Ajanları dünyası hakkında daha fazla şey öğrenmenin keyfini çıkarın! 

[Yapay Zeka Ajanlarına ve Ajan Kullanım Senaryolarına Giriş](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->