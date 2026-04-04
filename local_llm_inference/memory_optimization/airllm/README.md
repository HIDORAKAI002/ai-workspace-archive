# AirLLM — 70B Inference on a Single 4GB GPU

> **Upstream:** [lyogavin/Anima](https://github.com/lyogavin/Anima) (`air_llm/` subdirectory)
> **PyPI:** `pip install airllm`

## What It Does

AirLLM enables inference of 70B+ parameter LLMs on consumer hardware with as little as **4GB VRAM** by streaming model layers through GPU memory one at a time. No quantization needed — runs the full-precision model.

## Key Features

| Feature | Details |
|---|---|
| Layer-wise streaming | Loads one transformer layer at a time into VRAM |
| Minimal VRAM | 70B models on 4GB GPU (e.g. GTX 1060, RTX 3060) |
| No quantization required | Full FP16/BF16 precision, no quality loss |
| HuggingFace compatible | Works with any HF-hosted model |
| Flash Attention 2 | Optional acceleration when available |
| Multi-GPU support | Distribute layers across multiple GPUs |
| Compression support | 4-bit/8-bit via bitsandbytes for even less VRAM |

## Quick Start

```python
from airllm import AutoModel

# Load any HuggingFace model — even 70B on 4GB VRAM
model = AutoModel.from_pretrained("meta-llama/Llama-2-70b-hf")

# Generate text
input_text = ["What is the meaning of life?"]
generation_output = model.generate(
    input_text,
    max_new_tokens=128,
    use_cache=True,
    return_dict_in_generate=True
)

output = generation_output.sequences[0]
print(output)
```

## Supported Model Architectures

- **LLaMA** (1, 2, 3) — all sizes including 70B
- **Mistral** / **Mixtral**
- **Qwen** / **Qwen2**
- **Baichuan**
- **InternLM**
- **ChatGLM**
- Any HuggingFace-compatible transformer architecture

## How It Works

```
┌─────────────────────────────────────────────┐
│                  System RAM                 │
│  ┌─────────┐ ┌─────────┐     ┌─────────┐   │
│  │ Layer 0 │ │ Layer 1 │ ... │ Layer N │   │
│  └────┬────┘ └────┬────┘     └────┬────┘   │
│       │           │               │         │
│       ▼           ▼               ▼         │
│  ┌──────────────────────────────────────┐   │
│  │   Stream one layer at a time to GPU  │   │
│  └──────────────┬───────────────────────┘   │
│                 │                            │
│                 ▼                            │
│  ┌──────────────────────┐                   │
│  │   GPU (4GB VRAM)     │                   │
│  │   Process layer →    │                   │
│  │   Return to RAM →    │                   │
│  │   Load next layer    │                   │
│  └──────────────────────┘                   │
└─────────────────────────────────────────────┘
```

## Installation

```bash
pip install airllm

# With Flash Attention 2 support (optional, faster)
pip install airllm[flash_attn]
```

## Performance Notes

- **Inference speed**: Slower than full-VRAM inference (sequential layer loading), but makes previously impossible models accessible
- **RAM requirement**: Need enough system RAM to hold the full model (~140GB for 70B FP16)
- **Best for**: Research, experimentation, local AI without cloud costs
- **Not for**: High-throughput production serving (use vLLM/TGI for that)

## Archive Notes

This directory is auto-synced from the `lyogavin/Anima` upstream repository by the VPS sync bot. The AirLLM library lives in the `air_llm/` subdirectory of that repo.

## See Also (in this archive)

- `/llm_tools___utilities/llm_inference___optimization/ollama` — Local LLM runner (GGUF quantized)
- `/llm_tools___utilities/llm_inference___optimization/llama.cpp` — C++ inference engine
- `/llm_tools___utilities/llm_inference___optimization/vllm` — High-throughput serving
- `/ai_infrastructure___tooling/llm_inference/sglang` — Structured generation
