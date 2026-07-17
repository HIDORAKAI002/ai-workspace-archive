## 시작하기  

[![Build Your First MCP Server](../../../translated_images/ko/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(이 수업의 영상을 보시려면 위 이미지를 클릭하세요)_

이 섹션은 여러 수업으로 구성되어 있습니다:

- **1 당신의 첫 서버**, 첫 번째 수업에서는 첫 서버를 만드는 방법과 서버를 테스트 및 디버깅할 수 있는 유용한 도구인 인스펙터 툴로 검사하는 방법을 배우게 됩니다, [수업으로](01-first-server/README.md)

- **2 클라이언트**, 이 수업에서는 서버에 연결할 수 있는 클라이언트를 작성하는 방법을 배우게 됩니다, [수업으로](02-client/README.md)

- **3 LLM이 있는 클라이언트**, 클라이언트를 작성하는 더 나은 방법은 LLM을 추가하여 서버와 "협상"하는 기능을 갖추는 것입니다, [수업으로](03-llm-client/README.md)

- **4 Visual Studio Code에서 GitHub Copilot 에이전트 모드로 서버 사용하기**. 여기서는 Visual Studio Code 내에서 MCP 서버를 실행하는 방법을 살펴봅니다, [수업으로](04-vscode/README.md)

- **5 stdio 전송 서버** stdio 전송은 로컬 MCP 서버-클라이언트 통신을 위한 권장 표준으로, 프로세스 격리가 내장된 안전한 서브프로세스 기반 통신을 제공합니다 [수업으로](05-stdio-server/README.md)

- **6 MCP를 이용한 HTTP 스트리밍(스트리머블 HTTP)**. 최신 HTTP 스트리밍 전송 방식에 대해 배우고 ([MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http) 권장 원격 MCP 서버 접근법), 진행 알림 및 스트리머블 HTTP를 활용한 확장 가능하고 실시간 MCP 서버와 클라이언트 구현 방법도 익힙니다. [수업으로](06-http-streaming/README.md)

- **7 VSCode를 위한 AI 툴킷 활용** MCP 클라이언트와 서버를 소비하고 테스트하는 방법 [수업으로](07-aitk/README.md)

- **8 테스트**. 이 수업에서는 서버와 클라이언트를 다양한 방법으로 테스트하는 것에 초점을 맞춥니다, [수업으로](08-testing/README.md)

- **9 배포**. 이 장에서는 MCP 솔루션을 배포하는 여러 방법을 살펴봅니다, [수업으로](09-deployment/README.md)

- **10 고급 서버 사용법**. 고급 서버 사용법을 다루는 장입니다, [수업으로](./10-advanced/README.md)

- **11 인증**. 기본 인증부터 JWT, RBAC까지 간단한 인증 추가 방법을 설명합니다. 여기서 시작해 5장 고급 주제와 2장의 추가 보안 강화 권장사항도 참고하시길 권장합니다, [수업으로](./11-simple-auth/README.md)

- **12 MCP 호스트**. Claude Desktop, Cursor, Cline, Windsurf 등 인기 MCP 호스트 클라이언트를 구성하고 사용합니다. 전송 방식과 문제 해결 방법도 배웁니다, [수업으로](./12-mcp-hosts/README.md)

- **13 MCP 인스펙터**. MCP 인스펙터 툴을 사용해 MCP 서버를 인터랙티브하게 디버그 및 테스트하는 방법, 문제 해결 도구, 리소스, 프로토콜 메시지 학습, [수업으로](./13-mcp-inspector/README.md)

- **14 샘플링**. LLM 관련 작업을 위해 MCP 클라이언트와 협동하는 MCP 서버 만들기 (`2026-07-28` 릴리스 후보에서 폐기됨; `2025-11-25`버전까지 유효) [수업으로](./14-sampling/README.md)

- **15 MCP 앱**. UI 지침을 포함하여 응답하는 MCP 서버 빌드, [수업으로](./15-mcp-apps/README.md)

Model Context Protocol (MCP)은 애플리케이션이 LLM에 컨텍스트를 제공하는 방법을 표준화한 오픈 프로토콜입니다. MCP를 AI 애플리케이션을 위한 USB-C 포트라고 생각하세요 - AI 모델을 다양한 데이터 소스와 도구에 연결할 수 있는 표준화된 방법을 제공합니다.

## 학습 목표

이 수업을 마치면 다음을 할 수 있게 됩니다:

- C#, Java, Python, TypeScript, JavaScript용 MCP 개발 환경 설정
- 커스텀 기능(리소스, 프롬프트, 도구)을 갖춘 기본 MCP 서버 빌드 및 배포
- MCP 서버에 연결하는 호스트 애플리케이션 생성
- MCP 구현 테스트 및 디버깅
- 일반적인 설정 문제와 해결책 이해
- 인기 있는 LLM 서비스에 MCP 구현 연결

## MCP 환경 설정

MCP 작업 전에 개발 환경을 준비하고 기본 워크플로를 이해하는 것이 중요합니다. 이 섹션은 원활한 시작을 위한 초기 설정 단계를 안내합니다.

### 필수 조건

MCP 개발에 뛰어들기 전에 다음을 확보하세요:

- **개발 환경**: 선택한 언어(C#, Java, Python, TypeScript 또는 JavaScript)
- **IDE/에디터**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm, 또는 최신 코드 에디터
- **패키지 관리자**: NuGet, Maven/Gradle, pip, 또는 npm/yarn
- **API 키**: 호스트 애플리케이션에서 사용할 AI 서비스 키


### 공식 SDK

다음 장들에서는 Python, TypeScript, Java, .NET을 사용하여 구축한 솔루션을 볼 수 있습니다. 공식 지원되는 모든 SDK는 아래와 같습니다.

MCP는 여러 언어용 공식 SDK를 제공합니다 ([MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)와 일치):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Microsoft와 협력 유지 관리
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Spring AI와 협력 유지 관리
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - 공식 TypeScript 구현
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - 공식 Python 구현 (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - 공식 Kotlin 구현
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Loopwork AI와 협력 유지 관리
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - 공식 Rust 구현
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - 공식 Go 구현

## 주요 내용 요약

- MCP 개발 환경 설정은 언어별 SDK로 간단함
- MCP 서버 빌드는 명확한 스키마를 가진 도구 생성 및 등록 포함
- MCP 클라이언트는 확장된 기능 활용을 위해 서버와 모델에 연결
- 테스트 및 디버깅은 안정적인 MCP 구현에 필수적
- 배포 옵션은 로컬 개발부터 클라우드 기반 솔루션까지 다양

## 실습하기

이 섹션 모든 장의 연습 문제를 보완하는 샘플 세트가 있습니다. 각 장에도 자체 연습 문제와 과제가 포함되어 있습니다.

- [Java 계산기](./samples/java/calculator/README.md)
- [.Net 계산기](../../../03-GettingStarted/samples/csharp)
- [JavaScript 계산기](./samples/javascript/README.md)
- [TypeScript 계산기](./samples/typescript/README.md)
- [Python 계산기](../../../03-GettingStarted/samples/python)

## 추가 자료

- [Azure에서 Model Context Protocol을 사용해 에이전트 빌드하기](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Azure 컨테이너 앱을 이용한 원격 MCP (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP 에이전트](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## 다음 단계

첫 수업부터 시작하세요: [첫 MCP 서버 만들기](01-first-server/README.md)

이 모듈을 완료하면 계속 진행하세요: [모듈 4: 실용 구현](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->