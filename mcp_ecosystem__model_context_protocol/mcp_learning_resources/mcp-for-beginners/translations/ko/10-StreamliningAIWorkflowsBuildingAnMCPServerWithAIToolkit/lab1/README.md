# 🚀 모듈 1: Microsoft Foundry Toolkit 기본 사항

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 학습 목표

이 모듈이 끝날 때쯤, 여러분은 다음을 할 수 있습니다:
- ✅ VS Code용 Microsoft Foundry Toolkit 확장 프로그램 설치 및 구성
- ✅ 모델 카탈로그를 탐색하고 다양한 모델 소스를 이해하기
- ✅ Playground를 이용해 모델 테스트 및 실험 수행
- ✅ Agent Builder를 사용해 맞춤 AI 에이전트 생성하기
- ✅ 다양한 공급자의 모델 성능 비교하기
- ✅ 프롬프트 엔지니어링을 위한 모범 사례 적용하기

## 🧠 Microsoft Foundry Toolkit 소개

<strong>VS Code용 Microsoft Foundry Toolkit 확장 프로그램</strong>은 VS Code를 종합 AI 개발 환경으로 변모시키는 Microsoft의 대표 확장 프로그램입니다. AI 연구와 실용적 애플리케이션 개발 간의 격차를 해소하여, 모든 수준의 개발자가 생성 AI를 쉽게 접근할 수 있게 합니다.

### 🌟 주요 기능

| 기능 | 설명 | 사용 사례 |
|---------|-------------|----------|
| **🗂️ 모델 카탈로그** | GitHub, ONNX, OpenAI, Anthropic, Google의 100개 이상 모델 접속 | 모델 탐색 및 선택 |
| **🔌 BYOM 지원** | 자신의 모델(로컬/원격) 통합 | 맞춤형 모델 배포 |
| **🎮 인터랙티브 플레이그라운드** | 채팅 인터페이스를 통한 실시간 모델 테스트 | 신속한 프로토타이핑 및 테스트 |
| **📎 멀티모달 지원** | 텍스트, 이미지 및 첨부 파일 처리 | 복잡한 AI 애플리케이션 |
| **⚡ 배치 처리** | 여러 프롬프트를 동시에 실행 | 효율적인 테스트 워크플로우 |
| **📊 모델 평가** | 내장 메트릭 (F1, 관련성, 유사성, 일관성) | 성능 평가 |

### 🎯 Microsoft Foundry Toolkit이 중요한 이유

- **🚀 개발 가속화**: 아이디어에서 프로토타입까지 몇 분 내 완료
- **🔄 통합 워크플로우**: 여러 AI 공급자를 한 인터페이스에서
- **🧪 간편한 실험**: 복잡한 설정 없이 모델 비교 가능
- **📈 프로덕션 준비 완료**: 프로토타입에서 배포까지 원활한 전환

## 🛠️ 사전 준비 및 설치

### 📦 Microsoft Foundry Toolkit 확장 프로그램 설치

**1단계: 확장 프로그램 마켓플레이스 접근**
1. Visual Studio Code 실행
2. 확장 프로그램 뷰로 이동 (`Ctrl+Shift+X` 또는 `Cmd+Shift+X`)
3. "Microsoft Foundry Toolkit" 검색

**2단계: 버전 선택**
- **🟢 정식 릴리스**: 프로덕션 환경 권장
- **🔶 사전 릴리스**: 최신 기능 조기 체험

**3단계: 설치 및 활성화**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/ko/aitkext.d28945a03eed003c.webp)

### ✅ 설치 확인 체크리스트
- [ ] VS Code 사이드바에 Microsoft Foundry Toolkit 아이콘이 나타나는가
- [ ] 확장 프로그램이 활성화되어 있는가
- [ ] 출력 패널에 설치 오류가 없는가

## 🧪 실습 1: GitHub 모델 탐색

**🎯 목표**: 모델 카탈로그를 숙달하고 첫 AI 모델 테스트하기

### 📊 1단계: 모델 카탈로그 탐색

모델 카탈로그는 AI 생태계의 관문입니다. 여러 공급자의 모델을 통합하여 검색과 비교를 쉽게 해줍니다.

**🔍 탐색 가이드:**

Microsoft Foundry Toolkit 사이드바에서 **MODELS - Catalog** 클릭

![Model Catalog](../../../../translated_images/ko/aimodel.263ed2be013d8fb0.webp)

**💡 팁**: 코드 생성, 창의적 글쓰기, 분석 등 사용 사례에 맞는 특정 기능 모델을 찾아보세요.

**⚠️ 참고**: GitHub 호스팅 모델(즉, GitHub Models)은 무료로 사용할 수 있으나 요청 및 토큰에 대한 속도 제한이 있습니다. Azure AI 또는 기타 엔드포인트를 통한 외부 모델에 접근하려면 적절한 API 키 또는 인증 정보가 필요합니다.

### 🚀 2단계: 첫 모델 추가 및 구성

**모델 선택 전략:**
- **GPT-4.1**: 복잡한 추론 및 분석에 최적
- **Phi-4-mini**: 가볍고 간단한 작업에 빠른 응답 제공

**🔧 구성 절차:**
1. 카탈로그에서 **OpenAI GPT-4.1** 선택
2. **내 모델에 추가** 클릭 - 모델이 사용 등록됨
3. **Playground에서 시도** 선택하여 테스트 환경 실행
4. 모델 초기화 대기 (첫 실행 시 시간이 걸릴 수 있음)

![Playground Setup](../../../../translated_images/ko/playground.dd6f5141344878ca.webp)

**⚙️ 모델 파라미터 이해하기:**
- **Temperature**: 창의력 조절 (0 = 결정적, 1 = 창의적)
- **Max Tokens**: 최대 응답 길이
- **Top-p**: 응답 다양성 위한 누클리어스 샘플링

### 🎯 3단계: 플레이그라운드 인터페이스 숙달하기

플레이그라운드는 AI 실험 실험실입니다. 최대한 활용하는 방법은 다음과 같습니다:

**🎨 프롬프트 엔지니어링 모범 사례:**
1. **구체적으로 작성**: 명확하고 자세한 지시가 더 좋은 결과 산출
2. **맥락 제공**: 관련 배경 정보를 포함
3. **예제 사용**: 모델에게 원하는 바를 예제로 보여주기
4. **반복 수정**: 초기 결과를 기반으로 프롬프트 다듬기

**🧪 테스트 시나리오:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/ko/result.1dfcf211fb359cf6.webp)

### 🏆 도전 과제: 모델 성능 비교

**🎯 목표**: 동일한 프롬프트로 여러 모델을 비교하여 각 모델의 강점 파악

**📋 지침:**
1. 작업 공간에 **Phi-4-mini** 추가
2. GPT-4.1 및 Phi-4-mini 둘 다 동일한 프롬프트 사용

![set](../../../../translated_images/ko/set.88132df189ecde2c.webp)

3. 응답 품질, 속도 및 정확도 비교
4. 결과 섹션에 발견 내용 기록

![Model Comparison](../../../../translated_images/ko/compare.97746cd0f9074955.webp)

**💡 주요 발견사항:**
- LLM과 SLM 사용 시점
- 비용과 성능 간의 균형
- 각 모델의 특화 기능

## 🤖 실습 2: Agent Builder로 맞춤형 에이전트 구축

**🎯 목표**: 특정 작업 및 워크플로우에 맞춘 전문화 AI 에이전트 만들기

### 🏗️ 1단계: Agent Builder 이해하기

Agent Builder야말로 Microsoft Foundry Toolkit의 핵심입니다. 강력한 대규모 언어 모델과 맞춤 지시, 특수 파라미터, 전문적 지식을 결합해 목적에 맞는 AI 비서를 만들 수 있습니다.

**🧠 에이전트 아키텍처 구성 요소:**
- **핵심 모델**: 기반 LLM (GPT-4, Groks, Phi 등)
- **시스템 프롬프트**: 에이전트 성격과 동작 정의
- <strong>파라미터</strong>: 최적 성능 위한 세밀 조정
- **도구 통합**: 외부 API 및 MCP 서비스 연결
- <strong>메모리</strong>: 대화 맥락 및 세션 유지

![Agent Builder Interface](../../../../translated_images/ko/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ 2단계: 에이전트 구성 심층 분석

**🎨 효과적인 시스템 프롬프트 작성:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*물론, Generate System Prompt 기능을 이용해 AI가 프롬프트 생성 및 최적화를 도와줄 수 있습니다*

**🔧 파라미터 최적화:**
| 파라미터 | 권장 범위 | 사용 사례 |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | 기술적/사실적 응답 |
| **Temperature** | 0.7-0.9 | 창의적/브레인스토밍 작업 |
| **Max Tokens** | 500-1000 | 간결한 응답 |
| **Max Tokens** | 2000-4000 | 상세한 설명 |

### 🐍 3단계: 실습 - Python 프로그래밍 에이전트

**🎯 미션**: 전문 Python 코딩 어시스턴트 만들기

**📋 구성 단계:**

1. **모델 선택**: **Claude 3.5 Sonnet** 선택 (코드 작업에 탁월함)

2. **시스템 프롬프트 설계**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```


3. **파라미터 구성**:
   - Temperature: 0.2 (일관되고 신뢰할 만한 코드 생성)
   - Max Tokens: 2000 (상세한 설명)
   - Top-p: 0.9 (균형 잡힌 창의성)

![Python Agent Configuration](../../../../translated_images/ko/pythonagent.5e51b406401c165f.webp)

### 🧪 4단계: Python 에이전트 테스트

**테스트 시나리오:**
1. **기본 기능**: "소수 찾기 함수 작성"
2. **복잡한 알고리즘**: "삽입, 삭제, 검색 메서드를 가진 이진 탐색 트리 구현"
3. **실제 문제**: "속도 제한과 재시도를 다루는 웹 스크래퍼 작성"
4. <strong>디버깅</strong>: "이 코드를 고쳐라 [버그 있는 코드 붙여넣기]"

**🏆 성공 기준:**
- ✅ 오류 없이 코드 실행
- ✅ 적절한 문서화 포함
- ✅ Python 모범 사례 준수
- ✅ 명확한 설명 제공
- ✅ 개선 제안

## 🎓 모듈 1 마무리 및 다음 단계

### 📊 지식 점검

이해도 테스트:
- [ ] 카탈로그 내 모델 간 차이를 설명할 수 있는가?
- [ ] 맞춤형 에이전트를 성공적으로 생성하고 테스트했는가?
- [ ] 다양한 사용 사례에 맞게 파라미터를 최적화하는 방법을 아는가?
- [ ] 효과적인 시스템 프롬프트를 설계할 수 있는가?

### 📚 추가 자료

- **Microsoft Foundry Toolkit 문서**: [공식 Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **프롬프트 엔지니어링 가이드**: [모범 사례](https://platform.openai.com/docs/guides/prompt-engineering)
- **Microsoft Foundry Toolkit 내 모델**: [모델 개발 현황](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 축하합니다!** Microsoft Foundry Toolkit의 기본을 마스터하셨으며, 더 고급 AI 애플리케이션 빌드를 위한 준비가 되셨습니다!

### 🔜 다음 모듈로 진행하기

더 진보된 기능이 궁금하신가요? **[모듈 2: MCP와 Microsoft Foundry Toolkit 기본 사항](../lab2/README.md)** 으로 넘어가 다음을 배우세요:
- 에이전트를 Model Context Protocol (MCP)을 이용해 외부 도구와 연결하는 법
- Playwright로 브라우저 자동화 에이전트 구축하기
- Microsoft Foundry Toolkit 에이전트와 MCP 서버 통합하기
- 외부 데이터와 기능으로 에이전트 강화하기

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->