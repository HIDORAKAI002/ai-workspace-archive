# 🚀 개발자 생산성을 혁신하는 10가지 Microsoft MCP 서버

## 🎯 이 가이드에서 배우게 될 내용

이 실용적인 가이드는 개발자가 AI 어시스턴트와 작업하는 방식을 실제로 변화시키고 있는 10가지 Microsoft MCP 서버를 소개합니다. MCP 서버가 *무엇을 할 수 있는지* 설명하기보다는, Microsoft와 그 외 여러 곳에서 실제 개발 워크플로우에 차이를 만드는 서버들을 보여드립니다.

이 가이드에 나온 각 서버는 실제 사용과 개발자 피드백을 바탕으로 엄선되었습니다. 각 서버가 무엇을 하는지뿐만 아니라, 왜 중요한지, 그리고 여러분의 프로젝트에서 최대한 활용하는 방법을 알게 될 것입니다. MCP가 처음이거나 이미 사용 중인 시스템을 확장하고자 할 때 모두에게 유용한, Microsoft 생태계에서 가장 실용적이고 영향력 있는 도구들입니다.

> **💡 빠른 시작 팁**
> 
> MCP가 처음인가요? 걱정 마세요! 이 가이드는 초보자도 쉽게 따라올 수 있도록 설계되었습니다. 개념을 설명해드리며 언제든지 [MCP 소개](../00-Introduction/README.md) 와 [핵심 개념](../01-CoreConcepts/README.md) 모듈로 돌아가 더 깊은 배경지식을 확인할 수 있습니다.

## 개요

이 종합 가이드는 개발자가 AI 어시스턴트 및 외부 도구와 상호작용하는 방식을 혁신하는 Microsoft MCP 서버 열 가지를 다룹니다. Azure 리소스 관리부터 문서 처리까지, 이 서버들은 모델 컨텍스트 프로토콜(Model Context Protocol)의 힘을 보여주어 원활하고 생산적인 개발 워크플로우를 만들어냅니다.

## 학습 목표

이 가이드를 마치면:
- MCP 서버가 개발자 생산성을 어떻게 향상시키는지 이해할 수 있습니다
- Microsoft의 가장 영향력 있는 MCP 서버 구현 사례를 배울 수 있습니다
- 각 서버의 실용적인 사용 사례를 발견할 수 있습니다
- VS Code와 Visual Studio에서 이러한 서버를 설정하고 구성하는 방법을 알 수 있습니다
- 넓은 MCP 생태계와 미래 방향을 탐험할 수 있습니다

## 🔧 MCP 서버 이해하기: 초보자 가이드

### MCP 서버란 무엇인가?

모델 컨텍스트 프로토콜(MCP)에 처음 접하는 분이라면, “MCP 서버가 정확히 뭔가요? 왜 신경 써야 하죠?”라는 궁금증이 생길 수 있습니다. 간단한 비유부터 시작해 보겠습니다.

MCP 서버는 AI 코딩 동반자(예: GitHub Copilot)가 외부 도구 및 서비스와 연결할 수 있도록 도와주는 전문화된 어시스턴트라고 생각하세요. 마치 다른 작업마다 스마트폰에서 날씨 앱, 내비게이션 앱, 뱅킹 앱을 사용하는 것처럼, MCP 서버는 AI 어시스턴트가 다양한 개발 도구와 서비스를 활용할 수 있게 해 줍니다.

### MCP 서버가 해결하는 문제

MCP 서버가 없던 시절에는 다음 같은 작업을 하려면:

- Azure 리소스 확인
- GitHub 이슈 생성
- 데이터베이스 쿼리
- 문서 검색

코딩을 멈추고 브라우저를 열어 해당 웹사이트로 접속해 수동으로 처리해야 했습니다. 이런 잦은 컨텍스트 전환은 집중을 방해하고 생산성을 떨어뜨립니다.

### MCP 서버가 개발 경험을 바꾸는 방법

MCP 서버 덕분에 개발 환경(VS Code, Visual Studio 등)을 벗어나지 않고도 AI 어시스턴트에게 이런 작업을 요청할 수 있습니다. 예를 들어:

**기존 방식:**
1. 코딩 중지
2. 브라우저 열기
3. Azure 포털 접속
4. 스토리지 계정 정보 조회
5. VS Code 복귀
6. 코딩 재개

**이제는 이렇게 할 수 있습니다:**
1. AI에 물어보기: "내 Azure 스토리지 계정 상태가 어때?"
2. 제공받은 정보로 코딩 계속 진행

### 초보자를 위한 주요 이점

#### 1. 🔄 **집중 상태 유지**
- 여러 앱을 전환할 필요 없음
- 작성 중인 코드에 집중할 수 있음
- 여러 도구 관리로 인한 정신적 부담 감소

#### 2. 🤖 **복잡한 명령 대신 자연어 사용**
- SQL 문법을 외우지 않고 원하는 데이터를 설명
- Azure CLI 명령어를 기억하지 않고 목표 설명
- AI가 기술적 세부사항을 처리하도록 맡기고 논리에 집중

#### 3. 🔗 **여러 도구 연결**
- 다양한 서비스를 조합해 강력한 워크플로우 생성
- 예시: "최근 GitHub 이슈 모두 가져와서 Azure DevOps 작업 항목 생성"
- 복잡한 스크립트 없이 자동화 구축 가능

#### 4. 🌐 **점점 커지는 생태계 이용**
- Microsoft, GitHub, 기타 회사에서 만든 서버 활용
- 다양한 공급자의 도구를 자유롭게 섞어 사용
- 다양한 AI 어시스턴트에서 통용되는 표준화된 생태계 참여

#### 5. 🛠️ **실습을 통해 배우기**
- 미리 구축된 서버로 개념 익히기
- 익숙해지면 직접 서버 구축 시도
- 제공되는 SDK와 문서 활용해 학습 진행

### 초보자를 위한 실제 사례

웹 개발이 처음이고 첫 프로젝트를 진행 중이라고 가정해 봅시다. MCP 서버가 이렇게 도움을 줄 수 있습니다:

**기존 접근법:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**MCP 서버 활용:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### 엔터프라이즈 표준의 장점

MCP는 산업 표준으로 자리 잡아가고 있어:
- <strong>일관성</strong>: 다양한 도구와 회사에 걸쳐 비슷한 경험 제공
- <strong>상호운용성</strong>: 여러 공급자의 서버가 협력 가능
- **미래 대비**: 다양한 AI 어시스턴트 간 기술과 설정 이전 용이
- <strong>커뮤니티</strong>: 방대한 공유 지식과 자원 생태계 참여

### 시작하기: 배우게 될 내용

이 가이드는 모든 수준의 개발자에게 특히 유용한 Microsoft MCP 서버 10가지를 탐색합니다. 각 서버는 다음을 목표로 설계되었습니다:
- 흔한 개발 문제 해결
- 반복 작업 감소
- 코드 품질 향상
- 학습 기회 강화

> **💡 학습 팁**
> 
> MCP가 완전 처음이라면 [MCP 소개](../00-Introduction/README.md)와 [핵심 개념](../01-CoreConcepts/README.md) 모듈부터 시작하세요. 그런 다음 여기로 돌아와 Microsoft 도구에 적용된 실제 사례를 확인하세요.
>
> MCP 중요성에 관한 추가 설명은 Maria Naggaga의 글 [한 번 연결, 어디서든 통합하는 MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps)를 참고하세요.

## VS Code 및 Visual Studio에서 MCP 시작하기 🚀

GitHub Copilot과 함께 Visual Studio Code 또는 Visual Studio 2022를 사용한다면 MCP 서버 설정은 간단합니다.

### VS Code 설정

기본 절차는 다음과 같습니다:

1. **에이전트 모드 활성화**: VS Code에서 Copilot Chat 창을 에이전트 모드로 전환
2. **MCP 서버 구성**: VS Code settings.json 파일에 서버 구성 추가
3. **서버 시작**: 사용하려는 각 서버 옆의 "시작" 버튼 클릭
4. **도구 선택**: 현재 세션에서 활성화할 MCP 서버 선택

자세한 설치 방법은 [VS Code MCP 문서](https://code.visualstudio.com/docs/copilot/copilot-mcp)를 참조하세요.

> **💡 프로 팁: MCP 서버를 전문가처럼 관리하기!**
> 
> VS Code 확장뷰에서 [설치된 MCP 서버를 관리하는 편리한 새 UI](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)가 추가되었습니다! 명확하고 간단한 인터페이스로 설치된 MCP 서버를 손쉽게 시작, 중지, 관리하세요. 꼭 사용해 보세요!

### Visual Studio 2022 설정

Visual Studio 2022 (버전 17.14 이상)의 경우:

1. **에이전트 모드 활성화**: GitHub Copilot Chat 창의 "Ask" 드롭다운에서 "Agent" 선택
2. **구성 파일 생성**: 솔루션 디렉터리에 `.mcp.json` 파일 생성 (권장 위치: `<SOLUTIONDIR>\.mcp.json`)
3. **서버 구성**: 표준 MCP 포맷으로 서버 구성 추가
4. **도구 승인**: 요청 시 적절한 범위 권한을 주어 도구 사용 승인

자세한 Visual Studio 설정 안내는 [Visual Studio MCP 문서](https://learn.microsoft.com/visualstudio/ide/mcp-servers)를 참고하세요.

각 MCP 서버는 별도의 구성 요구 사항(접속 문자열, 인증 등)이 있지만, 두 IDE 모두에서 설정 패턴은 일관됩니다.

## Microsoft MCP 서버로부터 얻은 교훈 🛠️

### 1. 📚 Microsoft Learn Docs MCP 서버

[![VS Code에서 설치](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![VS Code Insiders에서 설치](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>역할</strong>: Microsoft Learn Docs MCP 서버는 AI 어시스턴트가 모델 컨텍스트 프로토콜을 통해 실시간으로 공식 Microsoft 문서에 액세스할 수 있도록 하는 클라우드 호스팅 서비스입니다. `https://learn.microsoft.com/api/mcp`에 연결하여 Microsoft Learn, Azure 문서, Microsoft 365 문서 등 공식 Microsoft 출처를 아우르는 의미 기반 검색을 지원합니다.

**유용한 이유**: “단순 문서” 같겠지만, Microsoft 기술을 사용하는 모든 개발자에게 필수적인 서버입니다. .NET 개발자들이 AI 코딩 어시스턴트에 대해 가장 자주 하는 불만 중 하나는 최신 .NET 및 C# 릴리스 내용을 따라가지 못한다는 점입니다. Microsoft Learn Docs MCP 서버는 최신 문서, API 참조, 모범 사례에 실시간으로 접근하게 하여 이 문제를 해결합니다. 최신 Azure SDK를 사용하거나, 새롭게 추가된 C# 13 기능을 탐색하거나, 최신 .NET Aspire 패턴을 구현할 때도 AI 어시스턴트가 정확하고 현대적인 코드를 생성할 수 있도록 신뢰할 수 있는 정보에 접속하게 합니다.

**실제 활용 사례**: "Microsoft Learn 공식 문서에 따라 Azure 컨테이너 앱을 생성하는 az cli 명령어는 무엇인가요?" 또는 "ASP.NET Core에서 의존성 주입을 사용하게 Entity Framework를 어떻게 구성하나요?" 혹은 "이 코드를 Microsoft Learn 문서의 성능 권장 사항과 맞게 검토해 주세요." 서버는 Microsoft Learn, Azure 문서, Microsoft 365 문서를 고급 의미 기반 검색으로 포괄적으로 다루어 가장 맥락에 적합한 정보를 제공합니다. 최대 10건의 고품질 콘텐츠 청크를 제목과 URL과 함께 반환하며, 항상 최신 Microsoft 문서를 실시간으로 참조합니다.

**주목할 만한 예시**: 이 서버는 `microsoft_docs_search` 도구를 통해 Microsoft 공식 기술 문서에 의미 기반 검색을 수행합니다. 설정하면 "ASP.NET Core에서 JWT 인증을 어떻게 구현하나요?" 같은 질문에 공식 출처 링크와 함께 자세한 답변을 받을 수 있습니다. 검색 품질이 뛰어난 이유는 상황에 맞게 이해하기 때문입니다—Azure 컨테이너 관련 질문 시 Azure Container Instances 관련 문서를 반환하고, 동일한 단어가 .NET 문맥이라면 관련 C# 컬렉션 문서를 제공합니다.

급변하거나 최근 업데이트된 라이브러리와 사용 사례에 특히 유용합니다. 예를 들어 최근 프로젝트에서 최신 .NET Aspire 및 Microsoft.Extensions.AI 릴리스를 활용할 때, Microsoft Learn Docs MCP 서버 덕분에 API 문서뿐 아니라 새로 공개된 안내서와 워크스루도 활용할 수 있었습니다.

> **💡 프로 팁**
> 
> 도구 친화적인 모델도 MCP 도구 사용을 독려해야 합니다! 다음과 같은 시스템 프롬프트나 [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)를 추가해 보세요: "당신은 `microsoft.docs.mcp`에 접근 가능합니다 – C#, Azure, ASP.NET Core, Entity Framework 같은 Microsoft 기술 관련 질문 처리 시 이 도구를 사용하여 최신 공식 문서를 검색하세요."
>
> 훌륭한 예시로는 Awesome GitHub Copilot 저장소의 [C# .NET Janitor 채팅 모드](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md)를 참고하세요. 이 모드는 Microsoft Learn Docs MCP 서버를 활용해 최신 패턴과 모범 사례를 적용, C# 코드를 정리하고 현대화하는 데 도움을 줍니다.

### 2. ☁️ Azure MCP 서버
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**작동 방식**: Azure MCP 서버는 15개 이상의 전문화된 Azure 서비스 커넥터를 포함하는 포괄적인 스위트로, 전체 Azure 생태계를 AI 워크플로우에 통합합니다. 단일 서버가 아니라, 리소스 관리, 데이터베이스 연결(PostgreSQL, SQL Server), KQL을 활용한 Azure Monitor 로그 분석, Cosmos DB 통합 등 다양한 기능을 제공하는 강력한 모음입니다.

**유용한 이유**: Azure 리소스를 관리하는 것뿐만 아니라, 이 서버는 Azure SDK 작업 시 코드 품질을 획기적으로 향상시킵니다. Agent 모드에서 Azure MCP를 사용하면 단순한 코드 작성 지원을 넘어, 현재 인증 패턴, 오류 처리 모범 사례를 따르고 최신 SDK 기능을 활용하는 *더 나은* Azure 코드를 작성할 수 있습니다. 단순히 작동하는 일반 코드를 얻는 대신, 실제 운영 워크로드에 권장되는 Azure 패턴을 따르는 코드를 받는 것입니다.

**주요 모듈 포함**:
- **🗄️ 데이터베이스 커넥터**: Azure Database for PostgreSQL 및 SQL Server에 대한 자연어 직접 접근
- **📊 Azure Monitor**: KQL 기반 로그 분석 및 운영 인사이트
- **🌐 리소스 관리**: 전체 Azure 리소스 라이프사이클 관리
- **🔐 인증**: DefaultAzureCredential 및 관리형 ID 패턴
- **📦 스토리지 서비스**: Blob Storage, Queue Storage, Table Storage 작업
- **🚀 컨테이너 서비스**: Azure Container Apps, Container Instances, AKS 관리
- **그리고 더 많은 전문화된 커넥터들**

**실제 사용 예**: "내 Azure 스토리지 계정 목록 보여줘", "지난 한 시간 내 내 Log Analytics 작업 공간에서 오류 쿼리해줘", "적절한 인증과 함께 Node.js로 Azure 애플리케이션 만드는 데 도움 줘"

**전체 데모 시나리오**: Azure MCP와 GitHub Copilot for Azure 확장 기능을 VS Code에서 함께 사용할 때의 힘을 보여주는 완전한 워크스루입니다. 두 가지가 모두 설치된 상태에서 다음과 같이 명령합니다:

> "DefaultAzureCredential 인증을 사용해서 Azure Blob Storage에 파일을 업로드하는 Python 스크립트를 만들어줘. 스크립트는 'mycompanystorage'라는 내 Azure 스토리지 계정에 연결하고 'documents'라는 컨테이너에 업로드해야 해. 현재 타임스탬프로 테스트 파일을 생성하고 업로드하며, 오류를 우아하게 처리하고 유익한 출력을 제공해야 해. Azure 인증 및 오류 처리 모범 사례를 따르고, DefaultAzureCredential 인증 작동 방식을 설명하는 주석을 포함하며, 적절한 함수와 문서화를 갖춰 잘 구조화된 스크립트여야 해."

Azure MCP 서버는 완전한 프로덕션 준비된 Python 스크립트를 생성합니다:
- 최신 Azure Blob Storage SDK와 적절한 비동기 패턴 사용
- 포괄적인 폴백 체인 설명과 함께 DefaultAzureCredential 구현
- 구체적인 Azure 예외 유형을 포함한 견고한 오류 처리
- 자원 관리 및 연결 처리에 대한 Azure SDK 모범 사례 준수
- 상세 로깅과 유익한 콘솔 출력 제공
- 함수, 문서화, 타입 힌트를 포함해 적절히 구조화된 스크립트 생성

이 점이 놀라운 이유는, Azure MCP 없이는 작동하는 일반적인 blob storage 코드를 얻을 수 있지만, 최신 Azure 패턴을 따르지 않을 가능성이 크다는 것입니다. Azure MCP와 함께라면 최신 인증 방법을 활용하고 Azure 특유의 오류 시나리오를 처리하며, 마이크로소프트 권장 프로덕션 애플리케이션 관행을 따르는 코드를 얻을 수 있습니다.

**추천 예제**: 저는 ad-hoc 용도로 `az`와 `azd` CLI 명령어를 기억하는 것이 어려웠습니다. 항상 두 단계 과정입니다: 먼저 문법을 찾아보고 명령을 실행하는 거죠. CLI 문법을 기억하지 못한다고 인정하기 싫어서 포털에 들어가 클릭하며 작업해왔습니다. 원하는 것을 바로 설명할 수 있다는 점이 놀랍고, IDE를 떠나지 않고 할 수 있다는 점이 더 좋습니다!

[Azure MCP 저장소](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server)에는 시작하는 데 큰 도움이 되는 훌륭한 사용 사례 목록이 있습니다. 종합적인 설정 가이드와 고급 구성 옵션은 [공식 Azure MCP 문서](https://learn.microsoft.com/azure/developer/azure-mcp-server/)를 참조하세요.

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**작동 방식**: 공식 GitHub MCP 서버는 GitHub의 전체 생태계와 원활하게 통합되며, 호스팅된 원격 액세스와 로컬 Docker 배포 옵션을 모두 제공합니다. 이는 단순한 저장소 작업뿐만 아니라 GitHub Actions 관리, 풀 리퀘스트 워크플로우, 이슈 추적, 보안 스캔, 알림, 고급 자동화 기능을 포함하는 포괄적 툴킷입니다.

**유용한 이유**: 이 서버는 개발 환경에 GitHub 플랫폼 경험 전체를 직접 도입하여 GitHub과의 상호작용 방식을 혁신합니다. 프로젝트 관리, 코드 리뷰, CI/CD 모니터링을 위해 VS Code와 GitHub.com을 번갈아 가며 사용할 필요 없이 자연어 명령어로 모든 작업을 수행하면서 코드에 집중할 수 있습니다.

> **ℹ️ 참고: 다양한 'Agent' 유형**
> 
> 이 GitHub MCP 서버를 GitHub의 Coding Agent(자동 코드 작업을 위해 이슈에 할당할 수 있는 AI 에이전트)와 혼동하지 마세요. GitHub MCP 서버는 VS Code의 Agent 모드 내에서 GitHub API 통합을 제공하며, Coding Agent는 GitHub 이슈에 할당되면 풀 리퀘스트를 생성하는 별도의 기능입니다.

**주요 기능**:
- **⚙️ GitHub Actions**: 완전한 CI/CD 파이프라인 관리, 워크플로우 모니터링, 아티팩트 처리
- **🔀 풀 리퀘스트**: 생성, 검토, 병합 및 포괄적 상태 추적
- **🐛 이슈**: 전체 이슈 수명 주기 관리, 댓글, 라벨, 할당
- **🔒 보안**: 코드 스캔 경고, 비밀 감지, Dependabot 통합
- **🔔 알림**: 스마트 알림 관리 및 저장소 구독 제어
- **📁 저장소 관리**: 파일 작업, 브랜치 관리 및 저장소 운영
- **👥 협업**: 사용자 및 조직 검색, 팀 관리, 접근 제어

**실제 사용 예**: "내 기능 브랜치에서 풀 리퀘스트 생성해줘", "이번 주 실패한 CI 실행 모두 보여줘", "내 저장소의 열린 보안 경고 목록 보여줘", "내게 할당된 모든 이슈 찾아줘"

**전체 데모 시나리오**: GitHub MCP 서버의 기능을 보여주는 강력한 워크플로우입니다:

> "스프린트 리뷰 준비가 필요해. 이번 주 내가 생성한 모든 풀 리퀘스트 보여주고, CI/CD 파이프라인 상태 확인, 해결해야 할 보안 경고 요약 작성, 'feature' 라벨이 붙은 병합된 PR을 기반으로 릴리스 노트 초안 작성 도와줘."

GitHub MCP 서버는:
- 최근 풀 리퀘스트의 상세 상태 정보를 쿼리
- 워크플로우 실행 분석 및 실패나 성능 문제 강조
- 보안 스캔 결과 종합 및 중요 경고 우선순위 지정
- 병합된 PR에서 정보를 추출해 포괄적 릴리스 노트 생성
- 스프린트 계획 및 릴리스 준비를 위한 실행 가능한 다음 단계 제공

**추천 예제**: 코드 리뷰 워크플로우에 매우 유용합니다. VS Code, GitHub 알림, 풀 리퀘스트 페이지를 오가며 작업하는 대신 "내가 검토를 기다리는 모든 PR 보여줘" 라고 말하고, 이어서 "PR #123에 인증 메서드 오류 처리 관련 댓글 달아줘"라고 요청할 수 있습니다. 서버가 GitHub API 호출을 처리하고, 토론 문맥을 유지하며, 더욱 건설적인 리뷰 댓글 작성도 도와줍니다.

**인증 옵션**: 서버는 VS Code에서 원활한 OAuth와 개인 액세스 토큰 모두를 지원하며, 필요한 GitHub 기능만 활성화할 수 있는 구성 가능한 툴셋이 있습니다. 즉시 설정 가능한 원격 호스팅 서비스로 실행하거나, 완전한 제어를 위해 로컬 Docker로 실행할 수 있습니다.

> **💡 전문가 팁**
> 
> MCP 서버 설정 시 `--toolsets` 매개변수를 구성하여 필요한 툴셋만 활성화하면 컨텍스트 크기가 줄고 AI 도구 선택이 향상됩니다. 예를 들어, 핵심 개발 워크플로우용으로 `"--toolsets", "repos,issues,pull_requests,actions"`를 추가하거나, 주로 GitHub 모니터링 기능이 필요한 경우 `"--toolsets", "notifications, security"`를 사용할 수 있습니다.
### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**작동 방식**: Azure DevOps 서비스에 연결하여 포괄적인 프로젝트 관리, 작업 항목 추적, 빌드 파이프라인 관리, 저장소 작업을 제공합니다.

**유용한 이유**: Azure DevOps를 주요 DevOps 플랫폼으로 사용하는 팀에게 이 MCP 서버는 개발 환경과 Azure DevOps 웹 인터페이스 간 반복적인 탭 전환을 없애줍니다. AI 어시스턴트에서 직접 작업 항목 관리, 빌드 상태 확인, 저장소 조회 및 프로젝트 관리 작업을 할 수 있습니다.

**실제 사용 예**: "현재 스프린트의 WebApp 프로젝트에 활성 작업 항목 모두 보여줘", "방금 발견한 로그인 문제에 대한 버그 보고서 생성해줘", "빌드 파이프라인 상태 확인하고 최근 실패한 작업 보여줘"

**추천 예제**: "현재 스프린트의 WebApp 프로젝트에 활성 작업 항목 모두 보여줘" 또는 "방금 발견한 로그인 문제에 대한 버그 보고서 생성해줘"와 같은 간단한 쿼리로 팀의 스프린트 상태를 쉽게 확인할 수 있습니다. 개발 환경을 벗어나지 않고도 가능합니다.

### 5. 📝 MarkItDown MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

<strong>기능</strong>: MarkItDown은 다양한 파일 형식을 고품질 마크다운으로 변환하는 포괄적인 문서 변환 서버로, LLM 활용과 텍스트 분석 워크플로우에 최적화되어 있습니다.

**유용한 이유**: 현대 문서 워크플로우에 필수적입니다! MarkItDown은 제목, 목록, 표, 링크 등 중요한 문서 구조를 보존하면서 인상적인 범위의 파일 형식을 처리합니다. 단순 텍스트 추출 도구와 달리, AI 처리와 사람이 읽기 모두에 가치 있는 의미론적 의미와 서식을 유지하는 데 중점을 둡니다.

**지원되는 파일 형식**:
- **오피스 문서**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **미디어 파일**: 이미지(EXIF 메타데이터 및 OCR 포함), 오디오(EXIF 메타데이터 및 음성 전사 포함)
- **웹 콘텐츠**: HTML, RSS 피드, YouTube URL, 위키피디아 페이지
- **데이터 형식**: CSV, JSON, XML, ZIP 파일(내용 재귀 처리)
- **출판 형식**: EPub, Jupyter 노트북(.ipynb)
- <strong>이메일</strong>: Outlook 메시지(.msg)
- <strong>고급</strong>: 향상된 PDF 처리를 위한 Azure Document Intelligence 통합

**고급 기능**: MarkItDown은 OpenAI 클라이언트를 사용할 때 LLM 기반 이미지 설명 지원, Azure Document Intelligence를 통한 향상된 PDF 처리, 음성 내용 전사, 추가 파일 형식 확장을 위한 플러그인 시스템을 지원합니다.

**실제 활용 사례**: "이 PowerPoint 프레젠테이션을 문서 사이트용 마크다운으로 변환", "이 PDF에서 적절한 제목 구조로 텍스트 추출", 또는 "이 Excel 스프레드시트를 읽기 쉬운 표 형식으로 변환"

**특징적인 예시**: [MarkItDown 문서](https://github.com/microsoft/markitdown#why-markdown)에서는 다음과 같이 설명합니다:

> 마크다운은 최소한의 마크업 또는 서식을 가진 평문에 매우 가깝지만 중요한 문서 구조를 나타낼 방법을 제공합니다. OpenAI의 GPT-4o와 같은 주류 LLM은 기본적으로 마크다운을 "구사"하며, 종종 별도의 지시 없이 답변에 마크다운을 포함합니다. 이는 마크다운 형식의 텍스트 수많은 양으로 학습되었고, 이를 잘 이해하고 있음을 시사합니다. 부수적으로, 마크다운 규칙은 토큰 효율성도 매우 높습니다.

MarkItDown은 AI 워크플로우에 중요한 문서 구조 보존에 매우 능숙합니다. 예를 들어, PowerPoint 프레젠테이션 변환 시 슬라이드 구성을 적절한 제목으로 유지하고, 표를 마크다운 표로 추출하며, 이미지에 대체 텍스트를 포함하고 발표자 노트도 처리합니다. 차트는 읽기 쉬운 데이터 표로 변환되고, 결과 마크다운은 원본 발표의 논리적 흐름을 유지합니다. 이는 프레젠테이션 내용을 AI 시스템에 제공하거나 기존 슬라이드로부터 문서를 생성하는 데 완벽합니다.

### 6. 🗃️ SQL Server MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>기능</strong>: SQL Server 데이터베이스(온프레미스, Azure SQL 또는 Fabric)에 대한 대화형 접근 제공

**유용한 이유**: PostgreSQL 서버와 유사하지만 Microsoft SQL 생태계에 특화됨. 간단한 연결 문자열로 연결하여 자연어로 쿼리할 수 있어, 더 이상 맥락 전환이 필요 없습니다!

**실제 활용 사례**: "지난 30일간 처리되지 않은 주문 모두 찾아줘" 같은 요청이 적절한 SQL 쿼리로 변환되어 포맷된 결과를 반환합니다.

**특징적인 예시**: 데이터베이스 연결을 설정하면 즉시 데이터와 대화할 수 있습니다. 블로그 게시물에서는 간단한 질문 "어느 데이터베이스에 연결되어 있나요?"를 통해 MCP 서버가 적절한 데이터베이스 도구를 호출해 SQL Server 인스턴스에 연결하고 현재 데이터베이스 연결 정보를 반환합니다. 단 한 줄의 SQL도 작성할 필요 없습니다. 서버는 스키마 관리부터 데이터 조작까지 자연어 명령을 통한 포괄적 데이터베이스 작업을 지원합니다. VS Code 및 Claude Desktop과 함께하는 완전한 설정 지침과 구성 예시는: [Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).

### 7. 🎭 Playwright MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

<strong>기능</strong>: AI 에이전트가 웹 페이지와 상호작용하여 테스트와 자동화를 수행할 수 있도록 지원

> **ℹ️ GitHub Copilot의 동력**
> 
> Playwright MCP Server는 GitHub Copilot의 코딩 에이전트를 구동하여 웹 브라우징 기능을 제공합니다! [이 기능에 대해 자세히 알아보기](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**유용한 이유**: 자연어 설명으로 구동되는 자동화 테스트에 완벽합니다. AI는 웹사이트를 탐색하고, 폼을 작성하며, 구조화된 접근성 스냅샷을 통해 데이터를 추출할 수 있습니다 – 매우 강력한 기능입니다!

**실제 활용 사례**: "로그인 흐름을 테스트하고 대시보드가 제대로 로드되는지 확인" 또는 "상품을 검색하고 결과 페이지를 검증하는 테스트 생성" – 애플리케이션 소스 코드 없이 모두 가능

**특징적인 예시**: 제 팀원 Debbie O'Brien이 최근 Playwright MCP Server로 멋진 작업을 하고 있습니다! 예를 들어, 그녀는 소스 코드 액세스 없이도 완전한 Playwright 테스트를 생성하는 방법을 보여주었는데, 영화 검색 앱을 위해 사이트에 접속하여 "Garfield"를 검색하고 영화가 결과에 나타나는지 검증하는 테스트를 Copilot에게 요청했습니다. MCP는 브라우저 세션을 띄우고 DOM 스냅샷으로 페이지 구조를 탐색하며 적절한 셀렉터를 찾아 첫 실행에서 성공한 완전한 TypeScript 테스트를 생성했습니다.

이 기능은 자연어 지시와 실행 가능한 테스트 코드 간의 간극을 메우는 데 매우 강력합니다. 전통적 방법은 수동 테스트 작성이나 코드베이스 접근이 필요했지만, Playwright MCP를 이용하면 외부 사이트, 클라이언트 애플리케이션, 또는 코드 접근이 불가능한 블랙박스 테스트 시나리오까지도 테스트할 수 있습니다.

### 8. 💻 Dev Box MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>기능</strong>: 자연어를 통해 Microsoft Dev Box 환경 관리

**유용한 이유**: 개발 환경 관리가 크게 단순해집니다! 특정 명령어를 기억할 필요 없이 개발 환경 생성, 구성, 관리 가능

**실제 활용 사례**: "최신 .NET SDK가 포함된 새 Dev Box를 설정하고 프로젝트에 맞게 구성해줘", "내 모든 개발 환경 상태를 확인해줘", 또는 "팀 프레젠테이션용 표준화된 데모 환경 생성"

**특징적인 예시**: 저는 개인 개발용으로 Dev Box를 애용합니다. James Montemagno가 설명해준 Dev Box의 장점 중 하나는 회의장에서든 호텔이든, 또는 비행기 와이파이든 상관없이 초고속 이더넷 연결을 제공한다는 점입니다. 실제로 최근 Bruges에서 Antwerp로 가는 버스 안에서 휴대전화 핫스팟에 연결한 채 회의 데모 연습을 했습니다! 다음 단계는 여러 개발 환경과 표준화된 데모 환경을 팀 단위로 관리하는 방법을 더 깊게 탐구하는 것입니다. 또 고객과 동료들로부터 많이 들은 큰 사용 사례는 미리 구성된 개발 환경용 Dev Box 사용입니다. 두 경우 모두 MCP를 사용해 Dev Box를 구성하고 관리하면 자연어 인터랙션으로 개발 환경 내에서 작업을 계속할 수 있습니다.

### 9. 🤖 Microsoft Foundry MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**기능 설명**: Microsoft Foundry MCP 서버는 개발자에게 모델 카탈로그, 배포 관리, Azure AI Search를 이용한 지식 인덱싱, 평가 도구 등 Azure AI 생태계에 대한 포괄적인 접근을 제공합니다. 이 실험적 서버는 AI 개발과 Azure의 강력한 AI 인프라 간의 다리 역할을 하여 AI 애플리케이션을 더 쉽고 빠르게 구축, 배포 및 평가할 수 있게 합니다.

**유용한 이유**: 이 서버는 엔터프라이즈급 AI 기능을 개발 워크플로로 직접 가져와 Azure AI 서비스 작업 방식을 혁신합니다. Azure 포털, 문서, IDE 사이를 왔다 갔다 하지 않고도 자연어 명령어를 통해 모델 발견, 서비스 배포, 지식 관리, AI 성능 평가를 할 수 있습니다. 특히 RAG(검색 증강 생성) 애플리케이션 구축, 다중 모델 배포 관리, 종합적인 AI 평가 파이프라인 구현에 강력한 도구입니다.

**주요 개발자 기능**:
- **🔍 모델 발견 및 배포**: Microsoft Foundry의 모델 카탈로그를 탐색하고, 코드 샘플과 함께 상세한 모델 정보를 확인하며, 모델을 Azure AI 서비스에 배포할 수 있습니다.
- **📚 지식 관리**: Azure AI Search 인덱스를 생성 및 관리하고, 문서를 추가하며, 인덱서 설정 및 정교한 RAG 시스템을 구축합니다.
- **⚡ AI 에이전트 통합**: Azure AI 에이전트에 연결해 기존 에이전트 쿼리 및 운영 환경에서 에이전트 성능을 평가합니다.
- **📊 평가 프레임워크**: 포괄적인 텍스트 및 에이전트 평가를 수행하고, 마크다운 보고서를 생성하며, AI 애플리케이션 품질 보증을 구현합니다.
- **🚀 프로토타이핑 도구**: GitHub 기반 프로토타이핑 위한 설정 지침을 받고, 첨단 연구 모델을 위한 Microsoft Foundry Labs에 접근할 수 있습니다.

**실제 개발자 사용 예**: "애플리케이션 용도의 Phi-4 모델을 Azure AI 서비스에 배포합니다", "내 문서 RAG 시스템용 새 검색 인덱스를 생성합니다", "내 에이전트 응답을 품질 지표로 평가합니다", 또는 "내 복잡한 분석 업무에 최적화된 추론 모델을 찾습니다"

**전체 데모 시나리오**: 강력한 AI 개발 워크플로는 다음과 같습니다:

> "고객 지원 에이전트를 만들고 있습니다. 카탈로그에서 좋은 추론 모델을 찾아 Azure AI 서비스에 배포하고, 문서에서 지식 베이스를 생성하며, 응답 품질을 테스트할 평가 프레임워크를 설정하고, GitHub 토큰을 사용해 통합 프로토타입 테스트를 도와주세요."

Microsoft Foundry MCP 서버는:
- 요구 사항에 맞는 최적 추론 모델을 추천하기 위해 모델 카탈로그를 조회합니다.
- 원하는 Azure 지역에 배포 명령과 할당량 정보를 제공합니다.
- 문서를 위한 올바른 스키마의 Azure AI Search 인덱스를 설정합니다.
- 품질 지표와 안전성 점검 포함 평가 파이프라인을 구성합니다.
- 즉시 테스트 가능한 GitHub 인증 프로토타입 코드를 생성합니다.
- 특정 기술 스택에 맞춘 종합 설정 가이드를 제공합니다.

**특징적인 예**: 개발자로서 여러 LLM 모델을 따라가기가 힘들었습니다. 몇 가지 주요 모델만 알지만 생산성과 효율성을 놓치는 느낌이 들었고, 토큰과 할당량 관리도 어렵고 스트레스였습니다—적절한 모델을 선택하고 있는지, 예산을 헛되이 쓰는지 늘 불안했습니다. 이번에 팀원에게서 MCP 서버를 추천 받아 James Montemagno의 설명도 듣고 사용해보려고 합니다! 모델 발견 기능은 일반적으로 알려진 모델 외에도 특정 작업에 최적화된 모델을 탐색하고자 하는 저 같은 사람에게 특히 인상적입니다. 평가 프레임워크는 그냥 새로운 걸 써보는 게 아니라 실제로 더 나은 결과를 내고 있는지를 검증하는 데 도움이 될 것입니다.

> **ℹ️ 실험적 상태**
>
> 이 MCP 서버는 실험적이며 활발히 개발 중입니다. 기능과 API가 변경될 수 있습니다. Azure AI 기능 탐색 및 프로토타입 구축에 적합하지만, 프로덕션 사용 시 안정성 요건을 신중히 검증해야 합니다.
### 10. 🏢 Microsoft 365 에이전트 툴킷 MCP 서버

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**기능 설명**: Microsoft 365 및 Microsoft 365 Copilot과 통합되는 AI 에이전트 및 애플리케이션 개발에 필수적인 도구들을 제공합니다. 여기에는 스키마 검증, 샘플 코드 조회, 문제 해결 지원이 포함됩니다.

**유용한 이유**: Microsoft 365 및 Copilot 개발은 복잡한 매니페스트 스키마와 특수한 개발 패턴을 요구합니다. 이 MCP 서버는 코딩 환경에 필수 개발 자원을 직접 제공하여 스키마 검증, 샘플 코드 찾기, 일반적인 문제 해결을 문서 참고 없이 쉽게 할 수 있도록 돕습니다.

**실제 사용 예**: "선언적 에이전트 매니페스트를 검증하고 스키마 오류를 수정하세요", "Microsoft Graph API 플러그인 구현 샘플 코드를 보여주세요", 또는 "Teams 앱 인증 문제를 해결하는 데 도움을 주세요"

**특징적인 예**: Build 행사에서 M365 에이전트 관련하여 친구 John Miller와 이야기 후 그가 이 MCP 서버를 추천해줬습니다. 문서에 파묻히지 않고 템플릿, 샘플 코드, 토대 구조를 제공해 M365 에이전트 초보자에게 좋을 것 같습니다. 스키마 검증 기능은 몇 시간씩 디버깅하게 만드는 매니페스트 구조 오류를 방지하는 데 특히 유용해 보입니다.

> **💡 프로 팁**
>
> Microsoft Learn Docs MCP 서버와 함께 사용하면 전반적인 M365 개발 지원이 향상됩니다 – 공식 문서를 제공하는 것과 실전 개발 도구 및 문제 해결 지원을 제공하는 것을 조합할 수 있습니다.


## 다음 단계는? 🔮

## 📋 결론

Model Context Protocol (MCP)은 개발자가 AI 어시스턴트 및 외부 도구와 상호작용하는 방식을 변화시키고 있습니다. 이 10가지 Microsoft MCP 서버는 표준화된 AI 통합의 힘을 보여주며, 개발자가 강력한 외부 기능에 접근하면서도 흐름을 끊지 않는 원활한 워크플로우를 가능하게 합니다.

종합적인 Azure 생태계 통합부터 브라우저 자동화용 Playwright, 문서 처리용 MarkItDown과 같은 전문 도구에 이르기까지, 이 서버들은 다양한 개발 시나리오에서 MCP가 생산성을 향상시키는 방식을 보여줍니다. 표준화된 프로토콜 덕분에 이 도구들은 함께 원활히 작동하여 통합된 개발 경험을 만듭니다.

MCP 생태계가 계속 발전함에 따라, 커뮤니티와 활발히 교류하고 새로운 서버를 탐색하며 맞춤형 솔루션을 구축하는 것이 개발 생산성을 극대화하는 핵심이 될 것입니다. MCP의 오픈 스탠다드 특성은 다양한 공급자의 도구를 자유롭게 조합하여 특정 요구에 맞는 완벽한 워크플로우를 만들 수 있음을 의미합니다.

## 🔗 추가 자료

- [Official Microsoft MCP Repository](https://github.com/microsoft/mcp)
- [MCP Community & Documentation](https://modelcontextprotocol.io/introduction)
- [VS Code MCP Documentation](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP Documentation](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP Documentation](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP Events](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot Customizations](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live 29th/30th July or watch on Demand ](https://aka.ms/mcpdevdays)

## 🎯 연습 과제

1. **설치 및 구성**: VS Code 환경에 MCP 서버 중 하나를 설치하고 기본 기능을 테스트해보세요.
2. **워크플로우 통합**: 최소 세 개의 서로 다른 MCP 서버를 조합한 개발 워크플로우를 설계해보세요.
3. **맞춤형 서버 기획**: 평소 개발 중 수행하는 작업 중 MCP 서버가 있으면 도움이 될 만한 업무를 찾아 사양서를 작성해보세요.
4. **성능 분석**: 공통 개발 작업을 위해 MCP 서버 사용과 전통적 접근법을 비교하여 효율성을 평가하세요.
5. **보안 평가**: 개발 환경에서 MCP 서버 사용 시 보안적 영향을 검토하고 모범 사례를 제안하세요.


Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->