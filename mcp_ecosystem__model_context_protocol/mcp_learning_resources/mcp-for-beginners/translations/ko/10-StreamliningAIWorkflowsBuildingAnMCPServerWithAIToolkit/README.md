# AI 워크플로우 간소화: AI Toolkit으로 MCP 서버 구축

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/ko/logo.ec93918ec338dadd.webp)

## 🎯 개요

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and AI Toolkit](../../../translated_images/ko/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(위 이미지를 클릭하여 이 강의의 비디오를 시청하세요)_

**Model Context Protocol (MCP) 워크숍**에 오신 것을 환영합니다! 이 종합 실습 워크숍은 AI 애플리케이션 개발을 혁신하는 두 가지 최첨단 기술을 결합합니다:

- **🔗 Model Context Protocol (MCP)**: 원활한 AI-도구 통합을 위한 오픈 표준
- **🛠️ Visual Studio Code용 AI Toolkit (AITK)**: Microsoft의 강력한 AI 개발 확장 기능

### 🎓 배울 내용

이 워크숍이 끝나면 AI 모델과 실제 도구 및 서비스를 연결하는 지능형 애플리케이션 구축 기술을 습득하게 됩니다. 자동화된 테스트부터 맞춤형 API 통합까지 복잡한 비즈니스 과제를 해결하는 실무 능력을 갖추게 됩니다.

## 🏗️ 기술 스택

### 🔌 Model Context Protocol (MCP)

MCP는 AI 모델을 외부 도구 및 데이터 소스에 연결하는 **"AI용 USB-C"**와 같은 범용 표준입니다.

**✨ 주요 특징:**

- 🔄 **표준화된 통합**: AI-도구 연결을 위한 보편적 인터페이스
- 🏛️ **유연한 아키텍처**: stdio/SSE 전송을 통한 로컬 및 원격 서버 지원
- 🧰 **풍부한 생태계**: 도구, 프롬프트 및 리소스를 하나의 프로토콜로 제공
- 🔒 **기업용 준비**: 내장된 보안 및 안정성

**🎯 MCP의 중요성:**
USB-C가 케이블 혼란을 없앤 것처럼, MCP는 AI 통합의 복잡성을 제거합니다. 하나의 프로토콜, 무한한 가능성.

### 🤖 Visual Studio Code용 AI Toolkit (AITK)

Microsoft의 주력 AI 개발 확장으로, VS Code를 AI 혁신 플랫폼으로 탈바꿈시킵니다.

**🚀 주요 기능:**

- 📦 **모델 카탈로그**: Azure AI, GitHub, Hugging Face, Ollama 모델 접근
- ⚡ **로컬 추론**: ONNX 최적화 CPU/GPU/NPU 실행
- 🏗️ **에이전트 빌더**: MCP 통합을 통한 시각적 AI 에이전트 개발
- 🎭 **멀티모달 지원**: 텍스트, 비전, 구조화된 출력 지원

**💡 개발 이점:**

- 무설정 모델 배포
- 시각적 프롬프트 엔지니어링
- 실시간 테스트 플레이그라운드
- 완벽한 MCP 서버 통합

## 📚 학습 여정

### [🚀 모듈 1: AI Toolkit 기초](./lab1/README.md)

**소요 시간**: 15분

- 🛠️ Visual Studio Code용 AI Toolkit 설치 및 구성
- 🗂️ 모델 카탈로그 탐색 (GitHub, ONNX, OpenAI, Anthropic, Google 등 100개 이상의 모델)
- 🎮 실시간 모델 테스트를 위한 인터랙티브 플레이그라운드 마스터
- 🤖 Agent Builder로 첫 AI 에이전트 구축
- 📊 내장된 메트릭(F1, 관련성, 유사성, 일관성)으로 모델 성능 평가
- ⚡ 배치 처리 및 멀티모달 지원 기능 학습

**🎯 학습 목표**: AITK 기능을 포괄적으로 이해하고 실용적인 AI 에이전트 생성

### [🌐 모듈 2: MCP와 AI Toolkit 기초](./lab2/README.md)

**소요 시간**: 20분

- 🧠 Model Context Protocol (MCP) 아키텍처 및 개념 숙달
- 🌐 Microsoft MCP 서버 생태계 탐색
- 🤖 Playwright MCP 서버를 사용한 브라우저 자동화 에이전트 구축
- 🔧 MCP 서버를 AI Toolkit Agent Builder와 통합
- 📊 에이전트 내 MCP 도구 구성 및 테스트
- 🚀 MCP 기반 에이전트 제작 및 배포

**🎯 학습 목표**: 외부 도구가 강화된 AI 에이전트 배포 능력 습득

### [🔧 모듈 3: AI Toolkit으로 고급 MCP 개발](./lab3/README.md)

**소요 시간**: 20분

- 💻 AI Toolkit으로 맞춤형 MCP 서버 구축
- 🐍 최신 MCP Python SDK(v1.9.3) 구성 및 활용
- 🔍 MCP Inspector를 이용한 디버깅 환경 설정 및 사용
- 🛠️ 전문 디버깅 워크플로우를 갖춘 날씨 MCP 서버 구축
- 🧪 Agent Builder 및 Inspector 환경에서 MCP 서버 디버깅

**🎯 학습 목표**: 최신 도구로 커스텀 MCP 서버 개발 및 디버깅

### [🐙 모듈 4: 실전 MCP 개발 - 맞춤형 GitHub Clone 서버](./lab4/README.md)

**소요 시간**: 30분

- 🏗️ 개발 워크플로우를 위한 실제 GitHub Clone MCP 서버 구축
- 🔄 검증 및 오류 처리를 포함한 스마트 리포지토리 클론 구현
- 📁 지능형 디렉터리 관리 및 VS Code 통합
- 🤖 GitHub Copilot Agent 모드를 커스텀 MCP 도구와 함께 사용
- 🛡️ 생산 환경에 적합한 신뢰성 및 크로스 플랫폼 호환성 적용

**🎯 학습 목표**: 실제 개발 워크플로우를 간소화하는 생산 준비된 MCP 서버 배포

## 💡 실제 적용 사례 및 영향

### 🏢 기업용 활용 사례

#### 🔄 DevOps 자동화

지능형 자동화를 통해 개발 워크플로우 혁신:

- **스마트 리포지토리 관리**: AI 기반 코드 리뷰 및 병합 결정
- **지능형 CI/CD**: 코드 변경에 따른 자동 파이프라인 최적화
- **이슈 분류**: 자동 버그 분류 및 할당

#### 🧪 품질 보증 혁신

AI 기반 자동화로 테스트 수준 향상:

- **지능형 테스트 생성**: 포괄적인 테스트 스위트 자동 생성
- **비주얼 회귀 테스트**: AI 기반 UI 변경 감지
- **성능 모니터링**: 사전 문제 식별 및 해결

#### 📊 데이터 파이프라인 인텔리전스

더 스마트한 데이터 처리 워크플로우 구축:

- **적응형 ETL 프로세스**: 자기 최적화 데이터 변환
- **이상 탐지**: 실시간 데이터 품질 모니터링
- **지능형 라우팅**: 스마트 데이터 흐름 관리

#### 🎧 고객 경험 향상

탁월한 고객 상호작용 생성:

- **상황 인지 지원**: 고객 이력에 접근 가능한 AI 에이전트
- **사전 문제 해결**: 예측적인 고객 서비스
- **멀티 채널 통합**: 플랫폼 전반의 통합 AI 경험

## 🛠️ 사전 준비 및 설정

### 💻 시스템 요구사항

| 구성요소 | 요구사항 | 비고 |
|-----------|-------------|-------|
| **운영 체제** | Windows 10+, macOS 10.15+, Linux | 최신 운영체제 모두 포함 |
| **Visual Studio Code** | 최신 안정 버전 | AITK 필수 |
| **Node.js** | v18.0+ 및 npm | MCP 서버 개발용 |
| **Python** | 3.10+ | Python MCP 서버 선택 사항 |
| **메모리** | 최소 8GB RAM | 로컬 모델용 16GB 권장 |

### 🔧 개발 환경

#### 권장 VS Code 확장 프로그램

- **AI Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python 디버거** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - 선택 사항이지만 유용

#### 선택 도구

- **uv**: 최신 Python 패키지 관리자
- **MCP Inspector**: MCP 서버용 시각적 디버깅 도구
- **Playwright**: 웹 자동화 예제용

## 🎖️ 학습 결과 및 인증 경로

### 🏆 역량 마스터 체크리스트

이 워크숍을 완료하면 다음의 마스터리를 달성할 수 있습니다:

#### 🎯 핵심 역량

- [ ] **MCP 프로토콜 마스터리**: 아키텍처 및 구현 패턴에 대한 심층 이해
- [ ] **AITK 숙련도**: AI Toolkit을 통한 신속한 개발 전문성 확보
- [ ] **커스텀 서버 개발**: MCP 서버 구축, 배포, 유지 관리
- [ ] **도구 통합 우수성**: 기존 개발 워크플로우와 AI 완벽 연동
- [ ] **문제 해결 적용**: 실무 비즈니스 문제에 학습 내용 적용

#### 🔧 기술적 역량

- [ ] VS Code에서 AI Toolkit 설치 및 구성
- [ ] 맞춤형 MCP 서버 설계 및 구현
- [ ] GitHub 모델을 MCP 아키텍처와 통합
- [ ] Playwright 자동화 테스트 워크플로우 구축
- [ ] 프로덕션용 AI 에이전트 배포
- [ ] MCP 서버 성능 디버깅 및 최적화

#### 🚀 고급 역량

- [ ] 엔터프라이즈 규모 AI 통합 아키텍처 설계
- [ ] AI 애플리케이션 보안 모범 사례 구현
- [ ] 확장 가능한 MCP 서버 아키텍처 설계
- [ ] 특정 도메인 맞춤 도구 체인 제작
- [ ] AI 네이티브 개발 멘토링

## 📖 추가 자료

- [MCP 사양 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [AI Toolkit GitHub 저장소](https://github.com/microsoft/vscode-ai-toolkit)
- [샘플 MCP 서버 모음](https://github.com/modelcontextprotocol/servers)
- [모범 사례 가이드](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 보안 모범 사례

---

**🚀 AI 개발 워크플로우 혁신할 준비가 되셨나요?**

MCP와 AI Toolkit으로 함께 지능형 애플리케이션의 미래를 구축해 봅시다!

## 다음 단계

계속 진행: [모듈 11: MCP 서버 실습](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역에는 오류나 부정확한 내용이 포함될 수 있음을 유의하시기 바랍니다. 원문은 해당 언어의 원본 문서가 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우 전문적인 인간 번역을 권장합니다. 본 번역의 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->