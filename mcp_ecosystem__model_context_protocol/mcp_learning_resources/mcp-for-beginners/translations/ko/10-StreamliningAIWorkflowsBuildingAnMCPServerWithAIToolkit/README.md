# AI 워크플로우 간소화: Microsoft Foundry Toolkit으로 MCP 서버 구축하기

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/ko/logo.ec93918ec338dadd.webp)

## 🎯 개요

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/ko/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(위 이미지를 클릭하면 이 강의의 비디오를 볼 수 있습니다)_

<strong>Model Context Protocol (MCP) 워크숍</strong>에 오신 것을 환영합니다! 이 종합 핸즈온 워크숍은 두 가지 최첨단 기술을 결합하여 AI 애플리케이션 개발에 혁신을 가져옵니다:

- **🔗 Model Context Protocol (MCP)**: 원활한 AI 도구 통합을 위한 오픈 스탠다드
- **🛠️ Microsoft Foundry Toolkit Extension for VS Code**: 마이크로소프트의 강력한 AI 개발 확장 도구

### 🎓 배울 내용

이 워크숍이 끝나면, AI 모델과 실제 툴 및 서비스를 잇는 지능형 애플리케이션 구축 기술을 습득하게 됩니다. 자동화 테스트부터 맞춤 API 통합에 이르기까지, 복잡한 비즈니스 과제를 해결할 실용적 기술을 얻으실 수 있습니다.

## 🏗️ 기술 스택

### 🔌 Model Context Protocol (MCP)

MCP는 **"AI를 위한 USB-C"** - AI 모델을 외부 도구 및 데이터 소스와 연결하는 범용 표준입니다.

**✨ 주요 특징:**

- 🔄 **표준화된 통합**: AI 도구 연결을 위한 범용 인터페이스
- 🏛️ **유연한 아키텍처**: stdio/SSE 전송 방식을 통한 로컬 및 원격 서버 지원
- 🧰 **풍부한 생태계**: 도구, 프롬프트 및 리소스를 하나의 프로토콜에 통합
- 🔒 **기업용 준비**: 내장된 보안과 신뢰성

**🎯 MCP가 중요한 이유:**
USB-C가 케이블 혼란을 없앴듯, MCP는 AI 통합의 복잡함을 해소합니다. 하나의 프로토콜, 무한한 가능성.

### 🤖 Microsoft Foundry Toolkit Extension for VS Code

마이크로소프트의 대표 AI 개발 확장으로 VS Code를 AI 강력 도구로 변화시킵니다.

**🚀 핵심 기능:**

- 📦 **모델 카탈로그**: Azure AI, GitHub, Hugging Face, Ollama 모델 접근
- ⚡ **로컬 추론**: ONNX 최적화 CPU/GPU/NPU 실행 지원
- 🏗️ **에이전트 빌더**: MCP 통합 시각 AI 에이전트 개발
- 🎭 **멀티모달 지원**: 텍스트, 비전, 구조화 출력 지원

**💡 개발 이점:**

- 무설정 모델 배포
- 시각적 프롬프트 엔지니어링
- 실시간 테스트 플레이그라운드
- 원활한 MCP 서버 통합

## 📚 학습 여정

### [🚀 모듈 1: Microsoft Foundry Toolkit 기초](./lab1/README.md)

**소요 시간**: 15분

- 🛠️ Microsoft Foundry Toolkit VS Code 확장 설치 및 구성
- 🗂️ 모델 카탈로그 탐색 (GitHub, ONNX, OpenAI, Anthropic, Google의 100개 이상 모델)
- 🎮 실시간 모델 테스트를 위한 인터랙티브 플레이그라운드 마스터
- 🤖 에이전트 빌더로 첫 AI 에이전트 구축
- 📊 내장된 지표(F1, 관련성, 유사성, 일관성)로 모델 성능 평가
- ⚡ 배치 처리 및 멀티모달 지원 기능 학습

**🎯 학습 결과**: Microsoft Foundry Toolkit 기능을 완벽히 이해하고 실용적 AI 에이전트 생성

### [🌐 모듈 2: MCP와 Microsoft Foundry Toolkit 기초](./lab2/README.md)

**소요 시간**: 20분

- 🧠 Model Context Protocol (MCP) 아키텍처 및 개념 습득
- 🌐 마이크로소프트 MCP 서버 생태계 탐구
- 🤖 Playwright MCP 서버를 이용한 브라우저 자동화 에이전트 구축
- 🔧 MCP 서버를 Microsoft Foundry Toolkit 에이전트 빌더에 통합
- 📊 에이전트 내 MCP 도구 구성 및 테스트
- 🚀 MCP 기반 에이전트의 프로덕션 배포

**🎯 학습 결과**: 외부 도구로 강화된 AI 에이전트 배포 역량 획득

### [🔧 모듈 3: Microsoft Foundry Toolkit과 함께하는 고급 MCP 개발](./lab3/README.md)

**소요 시간**: 20분

- 💻 Microsoft Foundry Toolkit을 활용한 맞춤형 MCP 서버 생성
- 🐍 최신 MCP Python SDK(v1.9.3) 구성 및 사용
- 🔍 디버깅을 위한 MCP Inspector 설정 및 활용
- 🛠️ 전문화된 디버깅 워크플로우를 갖춘 날씨 MCP 서버 구축
- 🧪 에이전트 빌더와 Inspector에서 MCP 서버 디버깅

**🎯 학습 결과**: 현대적 도구를 이용한 맞춤 MCP 서버 개발 및 디버깅 능력 배양

### [🐙 모듈 4: 실전 MCP 개발 - 맞춤 GitHub 클론 서버](./lab4/README.md)

**소요 시간**: 30분

- 🏗️ 실제 개발 워크플로우에 맞는 GitHub 클론 MCP 서버 구축
- 🔄 검증 및 오류 처리 기능이 있는 스마트 리포지토리 클론 구현
- 📁 지능형 디렉터리 관리 및 VS Code 통합
- 🤖 GitHub Copilot 에이전트 모드에 맞춤 MCP 도구 활용
- 🛡️ 프로덕션급 안정성 및 크로스플랫폼 호환성 적용

**🎯 학습 결과**: 실제 개발 워크플로우를 간소화하는 프로덕션급 MCP 서버 배포

## 💡 실제 적용 사례 및 영향

### 🏢 기업 활용 사례

#### 🔄 DevOps 자동화

지능형 자동화로 개발 워크플로우 혁신:

- **스마트 리포지토리 관리**: AI 기반 코드 리뷰 및 병합 결정
- **지능형 CI/CD**: 코드 변경에 따른 자동화 파이프라인 최적화
- **이슈 분류**: 자동 버그 분류 및 할당

#### 🧪 품질 보증 혁신

AI 기반 자동화로 테스트 수준 향상:

- **지능형 테스트 생성**: 포괄적 테스트 스위트 자동 생성
- **시각적 회귀 테스트**: AI 기반 UI 변경 탐지
- **성능 모니터링**: 선제적 문제 식별 및 해결

#### 📊 데이터 파이프라인 인텔리전스

스마트한 데이터 처리 워크플로우 구축:

- **적응형 ETL 프로세스**: 자체 최적화 데이터 변환
- **이상 탐지**: 실시간 데이터 품질 모니터링
- **지능형 라우팅**: 스마트 데이터 흐름 관리

#### 🎧 고객 경험 향상

탁월한 고객 상호작용 창출:

- **컨텍스트 인식 지원**: 고객 이력에 접근 가능한 AI 에이전트
- **선제적 문제 해결**: 예측 기반 고객 서비스
- **멀티채널 통합**: 모든 플랫폼에서 통합된 AI 경험

## 🛠️ 사전 요구 사항 및 설치

### 💻 시스템 요구 사항

| 구성 요소 | 요구 사항 | 비고 |
|-----------|------------|-------|
| **운영 체제** | Windows 10 이상, macOS 10.15 이상, Linux | 최신 OS 모두 지원 |
| **Visual Studio Code** | 최신 안정화 버전 | Microsoft Foundry Toolkit 필수 |
| **Node.js** | v18.0 이상 및 npm | MCP 서버 개발용 |
| **Python** | 3.10 이상 | Python MCP 서버 선택 사항 |
| <strong>메모리</strong> | 최소 8GB RAM | 로컬 모델용 16GB 권장 |

### 🔧 개발 환경

#### 추천 VS Code 확장

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - 선택 사항이나 유용함

#### 선택 도구

- **uv**: 현대적인 Python 패키지 관리자
- **MCP Inspector**: MCP 서버용 시각적 디버깅 도구
- **Playwright**: 웹 자동화 예제용

## 🎖️ 학습 결과 및 인증 경로

### 🏆 숙련도 체크리스트

이 워크숍을 완료하면 다음에 능숙해집니다:

#### 🎯 핵심 역량

- [ ] **MCP 프로토콜 완전 정복**: 아키텍처 및 구현 패턴 심층 이해
- [ ] **Microsoft Foundry Toolkit 전문성**: 빠른 개발을 위한 고급 사용법
- [ ] **맞춤형 서버 개발**: 프로덕션 MCP 서버 구축, 배포 및 유지 관리
- [ ] **도구 통합 우수성**: AI와 기존 개발 워크플로우의 매끄러운 연결
- [ ] **문제 해결 적용력**: 학습한 기술을 실제 비즈니스 과제에 적용

#### 🔧 기술 능력

- [ ] VS Code에서 Microsoft Foundry Toolkit 설치 및 구성
- [ ] 맞춤형 MCP 서버 설계 및 구현
- [ ] MCP 아키텍처와 GitHub 모델 통합
- [ ] Playwright를 이용한 자동화 테스트 워크플로우 구축
- [ ] 프로덕션용 AI 에이전트 배포
- [ ] MCP 서버 성능 디버깅 및 최적화

#### 🚀 고급 역량

- [ ] 기업 규모 AI 통합 아키텍처 설계
- [ ] AI 애플리케이션 보안 모범 사례 구현
- [ ] 확장 가능한 MCP 서버 아키텍처 설계
- [ ] 특정 도메인을 위한 맞춤형 도구 체인 생성
- [ ] AI 네이티브 개발 멘토링

## 📖 추가 자료

- [MCP 사양 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub 저장소](https://github.com/microsoft/vscode-ai-toolkit)
- [샘플 MCP 서버 모음](https://github.com/modelcontextprotocol/servers)
- [모범 사례 가이드](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 보안 모범 사례

---

**🚀 AI 개발 워크플로우 혁신할 준비 되셨나요?**

MCP와 Microsoft Foundry Toolkit으로 지능형 애플리케이션의 미래를 함께 만들어갑시다!

## 다음 단계

계속 진행하기: [모듈 11: MCP 서버 실습](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->