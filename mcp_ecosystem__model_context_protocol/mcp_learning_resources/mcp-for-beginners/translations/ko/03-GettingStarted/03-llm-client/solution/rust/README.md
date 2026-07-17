# 이 샘플 실행하기

이것은 LLM 클라이언트 샘플용 Rust 솔루션입니다. Rust 툴체인이 설치되어 있어야 합니다. 자세한 내용은 [공식 설치 가이드](https://www.rust-lang.org/tools/install)를 참고하세요.

클라이언트는 GitHub Models 추론 엔드포인트(`https://models.github.ai/inference/chat`)를 통해 모델을 호출하며, `OPENAI_API_KEY` 환경 변수에서 GitHub 개인 액세스 토큰(PAT)을 읽습니다.

> [!NOTE]
> 이 저장소의 다른 솔루션들은 `GITHUB_TOKEN`을 사용합니다. Rust의 경우 OpenAI 클라이언트 구성과 일치시키기 위해 `OPENAI_API_KEY`를 동일한 값으로 설정하세요.

## -0- GitHub 토큰 설정하기

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# 파워셸
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- 샘플 빌드하기

```bash
cargo build
```

## -2- 샘플 실행하기

```bash
cargo run
```

클라이언트는 계산기 MCP 서버를 시작하고, 도구 목록을 가져오며, 모델(`openai/gpt-5-mini`)을 사용해 `add` 도구를 호출합니다. "Calling tool: add"와 같은 도구 호출 메시지와 그 결과가 출력되는 것을 볼 수 있습니다.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->