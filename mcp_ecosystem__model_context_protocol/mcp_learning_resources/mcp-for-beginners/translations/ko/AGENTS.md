# AGENTS.md

## 프로젝트 개요

<strong>초보자를 위한 MCP</strong>는 AI 모델과 클라이언트 애플리케이션 간 상호작용을 위한 표준화된 프레임워크인 모델 컨텍스트 프로토콜(MCP)을 학습하기 위한 오픈소스 교육 커리큘럼입니다. 이 저장소는 여러 프로그래밍 언어에 걸친 실습 코드 예제와 함께 포괄적인 학습 자료를 제공합니다.

### 주요 기술

- **프로그래밍 언어**: C#, Java, JavaScript, TypeScript, Python, Rust
- **프레임워크 및 SDK**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- <strong>데이터베이스</strong>: pgvector 확장이 포함된 PostgreSQL
- **클라우드 플랫폼**: Azure (컨테이너 앱, OpenAI, 콘텐츠 안전성, 애플리케이션 인사이트)
- **빌드 도구**: npm, Maven, pip, Cargo
- <strong>문서화</strong>: 자동 다국어 번역 지원 마크다운(48개 이상 언어)

### 아키텍처

- **11개 핵심 모듈(00-11)**: 기초부터 고급 주제까지 순차적인 학습 경로
- **실습 랩**: 여러 언어로 완성된 솔루션 코드가 포함된 실용적 연습
- **샘플 프로젝트**: 작동하는 MCP 서버 및 클라이언트 구현체
- **번역 시스템**: 다국어 지원을 위한 자동 GitHub Actions 워크플로우
- **이미지 자산**: 번역된 버전이 포함된 중앙 집중식 이미지 디렉터리

## 설치 명령어

이 저장소는 문서 중심입니다. 대부분의 설정은 개별 샘플 프로젝트 및 랩 내에서 이루어집니다.

### 저장소 설정

```bash
# 저장소를 복제하세요
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### 샘플 프로젝트 작업하기

샘플 프로젝트 위치:
- `03-GettingStarted/samples/` - 언어별 예제
- `03-GettingStarted/01-first-server/solution/` - 첫 서버 구현
- `03-GettingStarted/02-client/solution/` - 클라이언트 구현
- `11-MCPServerHandsOnLabs/` - 종합 데이터베이스 통합 랩

각 샘플 프로젝트는 자체 설치 지침을 포함합니다:

#### TypeScript/JavaScript 프로젝트
```bash
cd <project-directory>
npm install
npm start
```

#### Python 프로젝트
```bash
cd <project-directory>
pip install -r requirements.txt
# 또는
pip install -e .
python main.py
```

#### Java 프로젝트
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## 개발 워크플로우

### 문서 구조

- **모듈 00-11**: 순차적인 핵심 커리큘럼 콘텐츠
- **translations/**: 언어별 버전(자동 생성, 직접 편집 금지)
- **translated_images/**: 현지화된 이미지 버전(자동 생성)
- **images/**: 원본 이미지 및 다이어그램

### 문서 변경 사항 적용

1. 루트 모듈 디렉터리(00-11) 내의 영어 마크다운 파일만 편집
2. 필요한 경우 `images/` 디렉터리 내 이미지 업데이트
3. co-op-translator GitHub Actions가 자동으로 번역 생성
4. main 브랜치 푸시 시 번역 재생성

### 번역 작업

- **자동 번역**: GitHub Actions 워크플로우가 모든 번역 처리
- **`translations/` 디렉터리 내 파일을 수동으로 편집 금지**
- 각 번역 파일에 메타데이터 포함
- 지원 언어: 아랍어, 중국어, 프랑스어, 독일어, 힌디어, 일본어, 한국어, 포르투갈어, 러시아어, 스페인어 등 48개 이상

## 테스트 지침

### 문서 검증

주요 내용은 문서 저장소이므로 테스트 대상:

1. **링크 검증**: 모든 내부 링크 작동 확인
```bash
# 깨진 마크다운 링크를 확인하세요
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **코드 샘플 검증**: 코드 예제가 컴파일/실행 되는지 테스트
```bash
# 특정 샘플로 이동하여 해당 테스트를 실행합니다
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **마크다운 린팅**: 형식 일관성 검사
```bash
# 필요시 markdownlint를 사용하세요
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### 샘플 프로젝트 테스트

언어별 샘플마다 테스트 방법이 다름:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## 코드 스타일 가이드라인

### 문서 스타일

- 명확하고 초보자 친화적인 언어 사용
- 필요한 경우 여러 언어 코드 예제 포함
- 마크다운 최선의 관행 준수:
  - ATX 스타일 제목 (`#` 구문) 사용
  - 언어 식별자가 있는 펜스 코드 블록 사용
  - 이미지에 설명이 포함된 alt 텍스트 사용
  - 적절한 행 길이 유지 (엄격한 제한 없음, 합리적 사용 권장)

### 코드 샘플 스타일

#### TypeScript/JavaScript
- ES 모듈 (`import`/`export`) 사용
- TypeScript 엄격 모드 규칙 준수
- 타입 주석 포함
- ES2022 대상

#### Python
- PEP 8 스타일 가이드 준수
- 적절한 타입 힌트 사용
- 함수 및 클래스에 docstring 포함
- 최신 Python 기능 사용 (3.8 이상)

#### Java
- Spring Boot 규칙 준수
- Java 21 기능 사용
- 표준 Maven 프로젝트 구조 준수
- Javadoc 주석 포함

### 파일 구성

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## 빌드 및 배포

### 문서 배포

저장소는 GitHub Pages 또는 유사 플랫폼에서 문서 호스팅(해당 시)합니다. 메인 브랜치 변경 시 다음 절차 발생:

1. 번역 워크플로우(`.github/workflows/co-op-translator.yml`) 작동
2. 모든 영어 마크다운 파일에 대한 자동 번역
3. 필요 시 이미지 현지화

### 빌드 과정 불필요

이 저장소는 주로 마크다운 문서로 구성되어 있습니다. 핵심 커리큘럼 콘텐츠에 대한 컴파일 또는 빌드 단계 필요 없습니다.

### 샘플 프로젝트 배포

개별 샘플 프로젝트별 배포 지침이 있을 수 있음:
- MCP 서버 배포 가이드: `03-GettingStarted/09-deployment/` 참조
- Azure 컨테이너 앱 배포 예제: `11-MCPServerHandsOnLabs/` 참조

## 기여 가이드

### 풀 리퀘스트 절차

1. **포크 및 클론**: 저장소 포크 후 로컬에 복제
2. **브랜치 생성**: 설명적 브랜치 이름 사용 (예: `fix/typo-module-3`, `add/python-example`)
3. **변경 사항 적용**: 영어 마크다운 파일만 편집 (번역 파일 제외)
4. **로컬 테스트**: 마크다운 렌더링 정상 확인
5. **PR 제출**: 명확한 제목과 설명으로 PR 작성
6. **CLA**: 요청 시 Microsoft 기여자 라이선스 계약 서명

### PR 제목 형식

명확하고 설명적인 제목 사용:
- `[Module XX] 간단 설명` 모듈 관련 변경
- `[Samples] 설명` 샘플 코드 변경
- `[Docs] 설명` 일반 문서 업데이트

### 기여 가능한 항목

- 문서 또는 코드 샘플 버그 수정
- 추가 언어의 신규 코드 예제
- 기존 콘텐츠 개선 및 명확화
- 새로운 사례 연구 또는 실용적 예제
- 불명확하거나 부정확한 내용에 대한 이슈 제기

### 해서는 안 될 일

- `translations/` 디렉터리 내 파일 직접 편집 금지
- `translated_images/` 디렉터리 편집 금지
- 사전 논의 없는 대용량 바이너리 파일 추가 금지
- 조율 없는 번역 워크플로우 파일 변경 금지

## 추가 참고사항

### 저장소 유지보수

- **변경 로그**: 주요 변경 사항은 `changelog.md`에 기록
- **학습 가이드**: 커리큘럼 안내용 `study_guide.md` 활용
- **이슈 템플릿**: 버그 보고 및 기능 요청을 위한 GitHub 이슈 템플릿 제공
- **행동 강령**: 모든 기여자는 Microsoft 오픈소스 행동 강령 준수 필수

### 학습 경로

최적의 학습을 위해 순차적으로 모듈 00-11 진행:
1. **00-02**: 기초 (소개, 핵심 개념, 보안)
2. **03**: 실습 시작
3. **04-05**: 실용적 구현 및 고급 주제
4. **06-10**: 커뮤니티, 모범 사례, 실제 응용
5. **11**: 종합 데이터베이스 통합 랩 (13개 순차 랩)

### 지원 리소스

- <strong>문서화</strong>: https://modelcontextprotocol.io/
- <strong>명세서</strong>: https://spec.modelcontextprotocol.io/
- <strong>커뮤니티</strong>: https://github.com/orgs/modelcontextprotocol/discussions
- <strong>디스코드</strong>: Microsoft Foundry 디스코드 서버
- **관련 강좌**: README.md에서 다른 Microsoft 학습 경로 참고

### 자주 묻는 문제 해결

**Q: 내 PR이 번역 검사에서 실패합니다**  
A: 루트 모듈 디렉터리 내 영어 마크다운 파일만 편집했는지 확인하세요. 번역본은 수정하지 말아야 합니다.

**Q: 새 언어를 추가하려면 어떻게 하나요?**  
A: 언어 지원은 co-op-translator 워크플로우로 관리됩니다. 새 언어 추가 논의를 위해 이슈를 열어주세요.

**Q: 코드 샘플이 작동하지 않습니다**  
A: 특정 샘플의 README에 있는 설치 지침을 따랐는지 확인하세요. 의존성 버전이 올바른지 점검하세요.

**Q: 이미지가 보이지 않습니다**  
A: 이미지 경로가 상대경로이고, 슬래시(`/`)를 사용했는지 확인하세요. 이미지는 `images/` 또는 현지화된 `translated_images/` 내에 있어야 합니다.

### 성능 관련 고려사항

- 번역 워크플로우 완료에 몇 분 소요될 수 있음
- 대용량 이미지는 커밋 전 최적화 권장
- 개별 마크다운 파일은 집중적이고 적절한 크기로 관리
- 더 나은 이식성을 위해 상대 링크 사용 권장

### 프로젝트 거버넌스

이 프로젝트는 Microsoft 오픈소스 관행을 따릅니다:  
- 코드 및 문서: MIT 라이선스  
- Microsoft 오픈소스 행동 강령  
- 기여 시 CLA 필수  
- 보안 이슈: SECURITY.md 지침 준수  
- 지원: SUPPORT.md 참고

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->