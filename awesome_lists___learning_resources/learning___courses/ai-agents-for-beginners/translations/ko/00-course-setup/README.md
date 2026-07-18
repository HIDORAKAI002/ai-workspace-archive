# 과정 설정

## 소개

이 수업에서는 이 과정의 코드 샘플을 실행하는 방법에 대해 다룹니다.

## 다른 학습자들과 함께하고 도움 받기

저장소를 복제하기 전에 [AI Agents For Beginners Discord 채널](https://aka.ms/ai-agents/discord)에 가입하여 설정 관련 도움을 받거나, 과정에 관한 질문을 하거나, 다른 학습자와 교류하세요.

## 이 저장소 복제 또는 포크하기

시작하려면 GitHub 저장소를 복제하거나 포크하세요. 이렇게 하면 코드 실행, 테스트 및 조정이 가능한 과정 자료의 나만의 버전을 만들 수 있습니다!

<a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">저장소 포크하기</a> 링크를 클릭하여 이 작업을 수행할 수 있습니다.

이제 다음 링크에서 이 과정의 자신만의 포크된 버전을 갖게 됩니다:

![포크된 저장소](../../../translated_images/ko/forked-repo.33f27ca1901baa6a.webp)

### 얕은 복제 (워크숍 / Codespaces에 권장)

>전체 저장소는 전체 기록과 모든 파일을 다운로드할 때 용량이 클 수 있습니다(~3GB). 워크숍에 참석하거나 몇 개의 수업 폴더만 필요할 경우, 얕은 복제(또는 희소 복제)는 기록을 축소하거나 블롭을 건너뜀으로써 대부분의 다운로드를 피할 수 있습니다.

#### 빠른 얕은 복제 — 최소한의 기록, 모든 파일

아래 명령어에서 `<your-username>`를 자신의 포크 URL(또는 업스트림 URL)로 바꾸세요.

최신 커밋 기록만 복제하려면(작은 다운로드):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

특정 브랜치를 복제하려면:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 부분(희소) 복제 — 최소한의 블롭 + 선택한 폴더만

이 방법은 부분 복제와 희소 체크아웃을 사용합니다(Git 2.25 이상 및 부분 복제 지원하는 최신 Git 권장):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

저장소 폴더로 이동하세요:

```bash|powershell
cd ai-agents-for-beginners
```

원하는 폴더를 지정하세요(아래 예는 두 개 폴더를 지정함):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

복제 후 파일을 확인하고, 파일만 필요하고 공간을 확보하고 싶다면(깃 기록 제거), 저장소 메타데이터를 삭제하세요 (💀 되돌릴 수 없음 — 커밋, 풀, 푸시, 기록 접근 불가).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# 파워셸
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces 사용하기 (로컬 대용량 다운로드를 피하려면 권장)

- [GitHub UI](https://github.com/codespaces)를 사용하여 이 저장소에 대한 새 Codespace를 만듭니다.  

- 새로 만든 Codespace 터미널에서 위의 얕은/희소 복제 명령어 중 하나를 실행하여 필요한 수업 폴더만 Codespace 작업 공간으로 가져옵니다.
- 옵션: Codespaces 내에서 복제 후 .git을 제거하여 추가 공간을 회수합니다(위 삭제 명령어 참고).
- 참고: 저장소를 Codespaces에서 직접 열 때(추가 복제 없이) Codespaces가 devcontainer 환경을 구성하며 필요한 것 이상을 프로비저닝할 수 있습니다. 새 Codespace 내에서 얕은 복제본을 복제하면 디스크 사용에 대해 더 많은 제어가 가능합니다.

#### 팁

- 편집/커밋하려면 항상 포크 URL로 복제 URL을 교체하세요.
- 더 많은 기록이나 파일이 필요하면 나중에 fetch하거나 희소 체크아웃을 조정하여 추가 폴더를 포함할 수 있습니다.

## 코드 실행하기

이 과정은 AI 에이전트 구축을 직접 체험할 수 있는 일련의 Jupyter 노트북을 제공합니다.

코드 샘플은 `FoundryChatClient`를 사용하는 <strong>Microsoft Agent Framework(MAF)</strong>를 이용하며, 이는 <strong>Microsoft Foundry</strong>를 통해 **Microsoft Foundry Agent Service V2**(Responses API)에 연결됩니다.

모든 파이썬 노트북은 `*-python-agent-framework.ipynb`로 라벨링되어 있습니다.

## 요구사항

- Python 3.12 이상
  - <strong>참고</strong>: Python3.12가 설치되어 있지 않다면 설치하세요. 요구사항 파일에서 올바른 버전 설치를 위해 python3.12로 venv를 만드세요.
  
    > 예시

    Python venv 디렉터리 생성:

    ```bash|powershell
    python -m venv venv
    ```

    다음으로 venv 환경을 활성화:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10 이상: .NET 샘플 코드를 위해 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 이상을 설치하세요. 설치한 .NET SDK 버전을 확인하세요:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 인증용 필수 도구입니다. [aka.ms/installazurecli](https://aka.ms/installazurecli)에서 설치하세요.
- **Azure 구독** — Microsoft Foundry와 Microsoft Foundry Agent Service에 접근하기 위해 필요합니다.
- **Microsoft Foundry 프로젝트** — 배포된 모델을 가진 프로젝트(예: `gpt-4.1-mini`)를 생성하세요. 아래 [1단계](#1단계-microsoft-foundry-프로젝트-생성) 참조.

저장소 루트에 코드 샘플 실행에 필요한 모든 파이썬 패키지가 포함된 `requirements.txt` 파일이 있습니다.

저장소 루트에서 터미널에 다음 명령어를 실행해 설치할 수 있습니다:

```bash|powershell
pip install -r requirements.txt
```

충돌과 문제를 방지하려면 파이썬 가상 환경을 만드는 것을 권장합니다.

## VSCode 설정하기

VSCode에서 올바른 버전의 파이썬을 사용하는지 확인하세요.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry 및 Microsoft Foundry Agent Service 설정

### 1단계: Microsoft Foundry 프로젝트 생성

노트북을 실행하려면 배포된 모델이 있는 Microsoft Foundry <strong>허브</strong>와 <strong>프로젝트</strong>가 필요합니다.

1. [ai.azure.com](https://ai.azure.com)으로 가서 Azure 계정으로 로그인하세요.
2. <strong>허브</strong>를 생성하거나 기존 허브를 사용하세요. 참조: [허브 리소스 개요](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. 허브 내에서 <strong>프로젝트</strong>를 생성하세요.
4. **Models + Endpoints** → <strong>모델 배포</strong>에서 모델(예: `gpt-4.1-mini`)을 배포하세요.

### 2단계: 프로젝트 엔드포인트와 모델 배포명 가져오기

Microsoft Foundry 포털의 프로젝트에서:

- **프로젝트 엔드포인트** — <strong>개요</strong> 페이지로 가서 엔드포인트 URL을 복사하세요.

![프로젝트 연결 문자열](../../../translated_images/ko/project-endpoint.8cf04c9975bbfbf1.webp)

- **모델 배포 이름** — <strong>Models + Endpoints</strong>로 가서 배포된 모델을 선택하고 **배포 이름**(예: `gpt-4.1-mini`)을 확인하세요.

### 3단계: `az login`으로 Azure에 로그인

모든 노트북은 인증을 위해 **`AzureCliCredential`**을 사용합니다 — 관리할 API 키가 필요 없습니다. Azure CLI를 통해 로그인해야 합니다.

1. 아직 설치하지 않았다면 **Azure CLI를 설치하세요**: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. 다음을 실행하여 <strong>로그인</strong>하세요:

    ```bash|powershell
    az login
    ```

    브라우저 없는 원격/Codespace 환경이라면:

    ```bash|powershell
    az login --use-device-code
    ```

3. 프롬프트가 뜨면 **구독 선택** — Foundry 프로젝트가 있는 구독을 선택하세요.

4. 로그인이 되었는지 <strong>확인</strong>하세요:

    ```bash|powershell
    az account show
    ```

> **왜 `az login`인가?** 노트북은 `azure-identity` 패키지의 `AzureCliCredential`로 인증합니다. 즉, Azure CLI 세션이 인증을 제공 — API 키나 비밀 키를 `.env` 파일에 저장하지 않습니다. 이는 [보안 모범 사례](https://learn.microsoft.com/azure/developer/ai/keyless-connections)입니다.

### 4단계: `.env` 파일 생성

예시 파일을 복사하세요:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# 파워셸
Copy-Item .env.example .env
```

`.env` 파일을 열고 다음 두 값을 입력하세요:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| 변수 | 찾는 곳 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 포털 → 프로젝트 → <strong>개요</strong> 페이지 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 포털 → **Models + Endpoints** → 배포된 모델 이름 |

대부분의 수업은 여기까지입니다! 노트북은 자동으로 `az login` 세션을 통해 인증합니다.

### 5단계: 파이썬 의존성 설치

```bash|powershell
pip install -r requirements.txt
```

이전에 만든 가상 환경 내에서 실행하는 것을 권장합니다.

## 5과 추가 설정 (Agentic RAG)

5과는 <strong>Azure AI Search</strong>를 사용한 검색 증강 생성 기능을 사용합니다. 이 과정을 실행할 계획이라면 `.env`에 이 변수를 추가하세요:

| 변수 | 찾는 곳 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 포털 → **Azure AI Search** 리소스 → <strong>개요</strong> → URL |
| `AZURE_SEARCH_API_KEY` | Azure 포털 → **Azure AI Search** 리소스 → <strong>설정</strong> → <strong>키</strong> → 주 관리자 키 |

## Azure OpenAI를 직접 호출하는 수업 추가 설정 (6과 및 8과)

6과, 8과 일부 노트북은 Microsoft Foundry 프로젝트를 거치지 않고 <strong>Azure OpenAI</strong>를 직접 사용합니다(**Responses API** 사용). 이전 샘플은 사용 중단 예정인 GitHub Models를 사용했습니다(2026년 7월 퇴출 예정) 및 Responses API 지원 불가. 해당 샘플 실행 시 `.env`에 다음 변수를 추가하세요:

| 변수 | 찾는 곳 |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure 포털 → **Azure OpenAI** 리소스 → **키 및 엔드포인트** → 엔드포인트 (예: `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Responses API를 지원하는 배포 모델 이름 (예: `gpt-4.1-mini`) |
| `AZURE_OPENAI_API_KEY` | 선택 사항 — `az login` / Entra ID 대신 키 기반 인증 사용 시에만 |

> Responses API는 안정된 `/openai/v1/` 엔드포인트를 사용하므로 `api-version` 필드가 필요 없습니다. 키 없는 Entra ID 인증을 위해 `az login`으로 로그인하세요.

## 대안 제공업체: MiniMax (OpenAI 호환)

[MiniMax](https://platform.minimaxi.com/)는 최대 204K 토큰의 대규모 컨텍스트 모델을 OpenAI 호환 API를 통해 제공합니다. Microsoft Agent Framework의 `OpenAIChatClient`는 OpenAI 호환 엔드포인트를 지원하므로 MiniMax를 Azure OpenAI 또는 OpenAI 대안으로 사용할 수 있습니다.

`.env` 파일에 이 변수를 추가하세요:

| 변수 | 찾는 곳 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax 플랫폼](https://platform.minimaxi.com/) → API 키 |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` (기본값 사용) |
| `MINIMAX_MODEL_ID` | 사용할 모델 이름 (예: `MiniMax-M3`) |

**예시 모델**: `MiniMax-M3`(권장), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed`(빠른 응답). 모델명과 가용성은 변동 가능하며, 계정이나 지역별 접근이 달라질 수 있습니다 — 최신 목록은 [MiniMax 플랫폼](https://platform.minimaxi.com/)에서 확인하세요. `MiniMax-M3`을 사용할 수 없으면 접근 가능한 모델로 `MINIMAX_MODEL_ID`를 설정하세요(예: `MiniMax-M2.7`).

`OpenAIChatClient`를 사용하는 코드 샘플(e.g., 14과 호텔 예약 워크플로우)은 `MINIMAX_API_KEY`가 설정되면 자동으로 MiniMax 구성을 감지해 사용합니다.

## 대안 제공업체: Foundry Local (기기 내 모델 실행)

[Foundry Local](https://foundrylocal.ai)는 오픈AI 호환 API를 통해 **전적으로 자신의 컴퓨터에서** 언어 모델을 다운로드, 관리, 제공하는 경량 런타임입니다 — 클라우드나 Azure 구독, API 키 불필요. 오프라인 개발, 클라우드 비용을 피하는 실험, 데이터 기기 보관에 최적입니다.

Microsoft Agent Framework의 `OpenAIChatClient`는 모든 OpenAI 호환 엔드포인트를 지원하므로 Foundry Local은 Azure OpenAI의 로컬 대안입니다.

**1. Foundry Local 설치**

```bash
# 윈도우
winget install Microsoft.FoundryLocal

# 맥OS
brew install foundrylocal
```

**2. 모델 다운로드 및 실행** (로컬 서비스 시작 포함):

```bash
foundry model list          # 사용 가능한 모델 보기
foundry model run phi-4-mini
```

**3. 로컬 엔드포인트 탐색용 파이썬 SDK 설치:**

```bash
pip install foundry-local-sdk
```

**4. Microsoft Agent Framework에서 로컬 모델 가리키기:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# 모델을 로컬에서 다운로드(필요한 경우)하고 제공한 다음, 엔드포인트/포트를 검색합니다.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # 예: http://localhost:<port>/v1
    api_key=manager.api_key,        # Foundry Local의 경우 항상 "not-required"입니다.
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **참고:** Foundry Local은 OpenAI 호환 **Chat Completions** 엔드포인트를 제공합니다. 로컬 개발과 오프라인 시나리오에 사용하세요. 전체 **Responses API** 기능(상태 유지 대화, 심층 도구 조율, 에이전트 스타일 개발)을 위해서는 수업 예시처럼 **Azure OpenAI** 또는 **Microsoft Foundry** 프로젝트를 대상으로 하세요. 현재 모델 목록과 플랫폼 지원은 [Foundry Local 문서](https://foundrylocal.ai)를 참고하세요.


## 8강 추가 설정 (Bing 그라운딩 워크플로우)

8강의 조건부 워크플로우 노트북은 Microsoft Foundry를 통한 <strong>Bing 그라운딩</strong>을 사용합니다. 해당 샘플을 실행할 계획이라면 `.env` 파일에 이 변수를 추가하세요:

| 변수 | 위치 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry 포털 → 프로젝트 → <strong>관리</strong> → **연결된 리소스** → Bing 연결 → 연결 ID 복사 |

## 문제 해결

### macOS에서 SSL 인증서 검증 오류

macOS에서 아래와 같은 오류가 발생할 경우:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

macOS의 Python에서 시스템 SSL 인증서를 자동으로 신뢰하지 않는 알려진 문제입니다. 다음 해결책을 순서대로 시도해 보세요:

**옵션 1: Python의 인증서 설치 스크립트 실행 (권장)**

```bash
# 설치된 Python 버전으로 3.XX를 교체하세요 (예: 3.12 또는 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**옵션 2: 노트북에서 `connection_verify=False` 사용 (GitHub Models 노트북에만 적용)**

6강 노트북 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`)에 이미 주석 처리된 우회 방법이 포함되어 있습니다. 클라이언트 생성 시 `connection_verify=False` 주석을 해제하세요:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 인증서 오류가 발생하면 SSL 검증을 비활성화하세요
)
```

> **⚠️ 경고:** SSL 검증 비활성화(`connection_verify=False`)는 인증서 검증을 생략하여 보안을 저하시킵니다. 개발 환경에서 임시 우회로만 사용하고, 프로덕션 환경에서는 절대 사용하지 마세요.

**옵션 3: `truststore` 설치 및 사용**

```bash
pip install truststore
```

그런 다음 네트워크 호출 전에 노트북이나 스크립트 상단에 다음을 추가하세요:

```python
import truststore
truststore.inject_into_ssl()
```

## 어디서 막혔나요?

이 설정 실행 중 문제가 있으면 <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI 커뮤니티 Discord</a>에 참여하거나 <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">이슈를 등록</a>하세요.

## 다음 강의

이제 이 강의 코드를 실행할 준비가 되었습니다. AI 에이전트의 세계를 더 즐겁게 배우세요!

[AI 에이전트 및 에이전트 사용 사례 소개](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->